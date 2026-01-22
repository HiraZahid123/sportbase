<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registration_attempts', function (Blueprint $table) {
            $table->id();
            $table->string('club_identifier')->nullable(); // The club identifier used in the attempt
            $table->string('ip_address', 45); // Support both IPv4 and IPv6
            $table->text('user_agent')->nullable(); // Browser/client information
            $table->boolean('success')->default(false); // Whether the registration was successful
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // User created (if successful)
            $table->foreignId('club_id')->nullable()->constrained()->onDelete('set null'); // Club associated with attempt
            $table->text('error_message')->nullable(); // Error message if registration failed
            $table->string('registration_source')->default('general'); // 'club-specific' or 'general'
            $table->timestamps();

            // Indexes for performance
            $table->index('club_identifier');
            $table->index('ip_address');
            $table->index('success');
            $table->index('created_at');
            $table->index(['ip_address', 'created_at']); // For rate limiting queries
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_attempts');
    }
};
