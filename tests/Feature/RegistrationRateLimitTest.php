<?php

namespace Tests\Feature;

use App\Http\Middleware\RegistrationRateLimitMiddleware;
use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class RegistrationRateLimitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Clear any existing rate limits
        RateLimiter::clear('registration:registration_form:127.0.0.1:' . md5(''));
        RateLimiter::clear('registration:registration_submit:127.0.0.1:' . md5(''));
        RateLimiter::clear('registration:club_specific:127.0.0.1:' . md5(''));
    }

    public function test_registration_form_rate_limiting()
    {
        // Make requests up to the limit (10 requests)
        for ($i = 0; $i < 10; $i++) {
            $response = $this->get('/register');
            $this->assertEquals(200, $response->getStatusCode());
            
            // Check rate limit headers
            $this->assertArrayHasKey('x-ratelimit-limit', $response->headers->all());
            $this->assertArrayHasKey('x-ratelimit-remaining', $response->headers->all());
            $this->assertEquals('10', $response->headers->get('x-ratelimit-limit'));
        }

        // The 11th request should be rate limited
        $response = $this->get('/register');
        $this->assertEquals(302, $response->getStatusCode()); // Redirect response
        
        // Check that it redirects back with error
        $response->assertSessionHas('error');
        $this->assertStringContainsString('Too many registration page requests', session('error'));
    }

    public function test_registration_submit_rate_limiting()
    {
        $requestData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'athlete',
            'club_id' => 1,
        ];

        // Make requests up to the limit (5 requests)
        for ($i = 0; $i < 5; $i++) {
            $response = $this->post('/register', array_merge($requestData, [
                'email' => "test{$i}@example.com"
            ]));
            
            // These will fail validation but should not be rate limited yet
            $this->assertNotEquals(429, $response->getStatusCode());
        }

        // The 6th request should be rate limited
        $response = $this->post('/register', array_merge($requestData, [
            'email' => 'test6@example.com'
        ]));
        
        $this->assertEquals(302, $response->getStatusCode()); // Redirect response
        $response->assertSessionHas('error');
        $this->assertStringContainsString('Too many registration attempts', session('error'));
    }

    public function test_club_specific_registration_rate_limiting()
    {
        // Create a club for testing with a proper UUID
        $club = Club::factory()->create([
            'registration_identifier' => (string) \Illuminate\Support\Str::uuid()
        ]);

        // Make requests up to the limit (15 requests for club-specific)
        for ($i = 0; $i < 15; $i++) {
            $response = $this->get('/register/club/' . $club->registration_identifier);
            
            // Debug the first few responses if they're not 200
            if ($response->getStatusCode() !== 200 && $i < 3) {
                dump("Request {$i}: Status " . $response->getStatusCode());
                dump("Session errors: " . json_encode(session()->all()));
            }
            
            $this->assertEquals(200, $response->getStatusCode(), "Request {$i} failed with status " . $response->getStatusCode());
            
            // Check rate limit headers
            $this->assertEquals('15', $response->headers->get('x-ratelimit-limit'));
        }

        // The 16th request should be rate limited
        $response = $this->get('/register/club/' . $club->registration_identifier);
        $this->assertEquals(302, $response->getStatusCode());
        
        $response->assertSessionHas('error');
        $this->assertStringContainsString('Too many club registration requests', session('error'));
    }

    public function test_different_rate_limits_for_different_endpoints()
    {
        $club = Club::factory()->create([
            'registration_identifier' => 'test-club-uuid'
        ]);

        // Test that different endpoints have different rate limits
        
        // Make 10 requests to general registration form (should hit limit)
        for ($i = 0; $i < 10; $i++) {
            $response = $this->get('/register');
            $this->assertEquals(200, $response->getStatusCode());
        }
        
        // 11th request to general registration should be rate limited
        $response = $this->get('/register');
        $this->assertEquals(302, $response->getStatusCode());
        
        // But club-specific registration should still work (different rate limit)
        $response = $this->get('/register/club/test-club-uuid');
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_rate_limit_headers_are_present()
    {
        $response = $this->get('/register');
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('x-ratelimit-limit', $response->headers->all());
        $this->assertArrayHasKey('x-ratelimit-remaining', $response->headers->all());
        $this->assertArrayHasKey('x-ratelimit-reset', $response->headers->all());
        
        $this->assertEquals('10', $response->headers->get('x-ratelimit-limit'));
        $this->assertEquals('9', $response->headers->get('x-ratelimit-remaining'));
    }

    public function test_rate_limit_stats_method()
    {
        $request = $this->app['request'];
        
        // Get initial stats
        $stats = RegistrationRateLimitMiddleware::getRateLimitStats($request, 'registration_form');
        
        $this->assertArrayHasKey('type', $stats);
        $this->assertArrayHasKey('max_attempts', $stats);
        $this->assertArrayHasKey('remaining', $stats);
        $this->assertArrayHasKey('retry_after', $stats);
        $this->assertArrayHasKey('is_rate_limited', $stats);
        
        $this->assertEquals('registration_form', $stats['type']);
        $this->assertEquals(10, $stats['max_attempts']);
        $this->assertFalse($stats['is_rate_limited']);
    }

    public function test_rate_limit_clear_functionality()
    {
        // Hit the rate limit
        for ($i = 0; $i < 11; $i++) {
            $this->get('/register');
        }
        
        // Verify we're rate limited
        $response = $this->get('/register');
        $this->assertEquals(302, $response->getStatusCode());
        
        // Clear the rate limit
        $request = $this->app['request'];
        RegistrationRateLimitMiddleware::clearRateLimit($request, 'registration_form');
        
        // Should be able to make requests again
        $response = $this->get('/register');
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_ajax_requests_return_json_response()
    {
        // Hit the rate limit first
        for ($i = 0; $i < 11; $i++) {
            $this->get('/register');
        }
        
        // Make an AJAX request that should be rate limited
        $response = $this->get('/register', [
            'X-Requested-With' => 'XMLHttpRequest',
            'Accept' => 'application/json'
        ]);
        
        $this->assertEquals(429, $response->getStatusCode());
        $response->assertJson([
            'message' => 'Too many registration page requests. Please try again later.',
        ]);
        
        $this->assertArrayHasKey('retry_after', $response->json());
        $this->assertArrayHasKey('retry_after_human', $response->json());
    }

    public function test_rate_limiting_includes_user_agent_in_key()
    {
        // Make requests with different user agents
        $userAgent1 = 'Mozilla/5.0 (Test Browser 1)';
        $userAgent2 = 'Mozilla/5.0 (Test Browser 2)';
        
        // Hit rate limit with first user agent
        for ($i = 0; $i < 11; $i++) {
            $this->get('/register', ['User-Agent' => $userAgent1]);
        }
        
        // First user agent should be rate limited
        $response = $this->get('/register', ['User-Agent' => $userAgent1]);
        $this->assertEquals(302, $response->getStatusCode());
        
        // Second user agent should still work (different rate limit key)
        $response = $this->get('/register', ['User-Agent' => $userAgent2]);
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_club_specific_rate_limiting_includes_identifier()
    {
        $club1 = Club::factory()->create(['registration_identifier' => (string) \Illuminate\Support\Str::uuid()]);
        $club2 = Club::factory()->create(['registration_identifier' => (string) \Illuminate\Support\Str::uuid()]);
        
        // Hit rate limit for first club
        for ($i = 0; $i < 16; $i++) {
            $this->get('/register/club/' . $club1->registration_identifier);
        }
        
        // First club should be rate limited
        $response = $this->get('/register/club/' . $club1->registration_identifier);
        $this->assertEquals(302, $response->getStatusCode());
        
        // Second club should still work (different identifier in rate limit key)
        $response = $this->get('/register/club/' . $club2->registration_identifier);
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_retry_after_header_is_present_when_rate_limited()
    {
        // Hit the rate limit
        for ($i = 0; $i < 11; $i++) {
            $this->get('/register');
        }
        
        // Make rate limited request
        $response = $this->get('/register', [
            'X-Requested-With' => 'XMLHttpRequest',
            'Accept' => 'application/json'
        ]);
        
        $this->assertEquals(429, $response->getStatusCode());
        $this->assertArrayHasKey('retry-after', $response->headers->all());
        
        $retryAfter = $response->headers->get('retry-after');
        $this->assertIsNumeric($retryAfter);
        $this->assertGreaterThan(0, (int)$retryAfter);
    }
}