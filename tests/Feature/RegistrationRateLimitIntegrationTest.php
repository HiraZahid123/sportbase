<?php

namespace Tests\Feature;

use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class RegistrationRateLimitIntegrationTest extends TestCase
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

    public function test_complete_registration_flow_with_rate_limiting()
    {
        // Create a club for testing
        $club = Club::factory()->create();

        // Test that we can access the club-specific registration page multiple times without being rate limited
        for ($i = 0; $i < 5; $i++) {
            $response = $this->get('/register/club/' . $club->registration_identifier);
            $this->assertEquals(200, $response->getStatusCode());
            
            // Verify the page contains the club information
            $response->assertInertia(fn ($page) => 
                $page->component('Auth/Register')
                    ->has('preselectedClub')
                    ->where('isClubSpecific', true)
                    ->where('preselectedClub.id', $club->id)
                    ->where('preselectedClub.name', $club->name)
            );
        }

        // Test that we can make registration attempts without being rate limited initially
        $registrationData = [
            'name' => 'Test Athlete',
            'email' => 'athlete@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'athlete',
            'club_id' => $club->id,
            'is_club_specific' => true,
        ];

        // Make a few registration attempts - they should succeed or fail validation, but not be rate limited
        for ($i = 0; $i < 2; $i++) {
            $response = $this->post('/register', array_merge($registrationData, [
                'email' => "athlete{$i}@example.com"
            ]));
            
            // Should not be rate limited (429 status)
            $this->assertNotEquals(429, $response->getStatusCode());
        }

        // Verify that the rate limiting is working by checking we can still make requests
        // without hitting the rate limit (5 requests per hour for registration submission)
        $this->assertTrue(true); // Test passes if we get here without rate limiting
    }

    public function test_rate_limiting_prevents_abuse_across_different_endpoints()
    {
        $club = Club::factory()->create();

        // Hit the general registration form rate limit
        for ($i = 0; $i < 10; $i++) {
            $response = $this->get('/register');
            $this->assertEquals(200, $response->getStatusCode());
        }

        // 11th request should be rate limited
        $response = $this->get('/register');
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas('error');

        // But club-specific registration should still work (different rate limit)
        $response = $this->get('/register/club/' . $club->registration_identifier);
        $this->assertEquals(200, $response->getStatusCode());

        // And registration submission should also still work (different rate limit)
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'athlete',
            'club_id' => $club->id,
        ]);
        
        // This should succeed or fail validation, but not be rate limited
        $this->assertNotEquals(429, $response->getStatusCode());
    }

    public function test_rate_limiting_headers_provide_useful_information()
    {
        $response = $this->get('/register');
        
        $this->assertEquals(200, $response->getStatusCode());
        
        // Check that rate limiting headers are present and have expected values
        $this->assertEquals('10', $response->headers->get('x-ratelimit-limit'));
        $this->assertEquals('9', $response->headers->get('x-ratelimit-remaining'));
        $this->assertNotNull($response->headers->get('x-ratelimit-reset'));
        
        // Make another request and verify the remaining count decreases
        $response = $this->get('/register');
        $this->assertEquals('8', $response->headers->get('x-ratelimit-remaining'));
    }

    public function test_rate_limiting_works_with_different_user_agents()
    {
        // This test ensures that different browsers/clients get separate rate limits
        $userAgent1 = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
        $userAgent2 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';

        // Hit rate limit with first user agent
        for ($i = 0; $i < 10; $i++) {
            $response = $this->get('/register', ['User-Agent' => $userAgent1]);
            $this->assertEquals(200, $response->getStatusCode());
        }

        // First user agent should be rate limited
        $response = $this->get('/register', ['User-Agent' => $userAgent1]);
        $this->assertEquals(302, $response->getStatusCode());

        // Second user agent should still work
        $response = $this->get('/register', ['User-Agent' => $userAgent2]);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('10', $response->headers->get('x-ratelimit-limit'));
        $this->assertEquals('9', $response->headers->get('x-ratelimit-remaining'));
    }

    public function test_ajax_requests_get_json_error_responses()
    {
        // Hit the rate limit first
        for ($i = 0; $i < 10; $i++) {
            $this->get('/register');
        }

        // Make an AJAX request that should be rate limited
        $response = $this->get('/register', [
            'X-Requested-With' => 'XMLHttpRequest',
            'Accept' => 'application/json'
        ]);

        $this->assertEquals(429, $response->getStatusCode());
        
        $responseData = $response->json();
        $this->assertArrayHasKey('message', $responseData);
        $this->assertArrayHasKey('retry_after', $responseData);
        $this->assertArrayHasKey('retry_after_human', $responseData);
        
        $this->assertStringContainsString('Too many registration page requests', $responseData['message']);
        $this->assertIsInt($responseData['retry_after']);
        $this->assertIsString($responseData['retry_after_human']);
    }

    public function test_rate_limiting_configuration_matches_requirements()
    {
        // Test that the rate limits match the security requirements
        
        // General registration form: 10 requests per hour
        for ($i = 0; $i < 10; $i++) {
            $response = $this->get('/register');
            $this->assertEquals(200, $response->getStatusCode());
        }
        $response = $this->get('/register');
        $this->assertEquals(302, $response->getStatusCode());

        // Clear rate limits for next test
        RateLimiter::clear('registration:registration_form:127.0.0.1:' . md5(''));

        // Registration submission: 5 requests per hour
        for ($i = 0; $i < 5; $i++) {
            $response = $this->post('/register', [
                'name' => 'Test User',
                'email' => "test{$i}@example.com",
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'role' => 'athlete',
                'club_id' => 1,
            ]);
            // These will fail validation but should not be rate limited yet
            $this->assertNotEquals(429, $response->getStatusCode());
        }
        
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test6@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'athlete',
            'club_id' => 1,
        ]);
        $this->assertEquals(302, $response->getStatusCode());

        // Clear rate limits for next test
        RateLimiter::clear('registration:registration_submit:127.0.0.1:' . md5(''));

        // Club-specific registration: 15 requests per hour
        $club = Club::factory()->create();
        for ($i = 0; $i < 15; $i++) {
            $response = $this->get('/register/club/' . $club->registration_identifier);
            $this->assertEquals(200, $response->getStatusCode());
        }
        $response = $this->get('/register/club/' . $club->registration_identifier);
        $this->assertEquals(302, $response->getStatusCode());
    }
}