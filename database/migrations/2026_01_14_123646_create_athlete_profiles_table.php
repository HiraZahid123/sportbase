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
        Schema::create('athlete_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('club_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('training_group_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('sex', ['male', 'female', 'other'])->nullable();
            $table->date('birthday')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->decimal('height', 5, 2)->nullable();
            $table->string('id_code')->nullable();
            $table->string('nationality')->nullable();
            $table->string('municipality')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->json('emergency_contact_json')->nullable();
            $table->boolean('is_paid')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('athlete_profiles');
    }
};
