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
        Schema::table('athlete_profiles', function (Blueprint $table) {
            $table->string('signature_name')->nullable();
            $table->longText('signature_data')->nullable(); // Using longText for base64 image data
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('athlete_profiles', function (Blueprint $table) {
            $table->dropColumn(['signature_name', 'signature_data']);
        });

    }
};
