<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if column already exists
        if (!Schema::hasColumn('clubs', 'registration_identifier')) {
            Schema::table('clubs', function (Blueprint $table) {
                // Add registration_identifier column with UUID type (nullable initially)
                $table->uuid('registration_identifier')->nullable()->after('id');
            });
        }
        
        // Populate existing clubs with unique registration identifiers (including empty ones)
        DB::table('clubs')
            ->where(function($query) {
                $query->whereNull('registration_identifier')
                      ->orWhere('registration_identifier', '');
            })
            ->get()
            ->each(function ($club) {
                DB::table('clubs')
                    ->where('id', $club->id)
                    ->update(['registration_identifier' => (string) Str::uuid()]);
            });
        
        // Make the column unique and not nullable
        Schema::table('clubs', function (Blueprint $table) {
            $table->uuid('registration_identifier')->unique()->change();
        });
        
        // Add index for performance
        Schema::table('clubs', function (Blueprint $table) {
            $table->index('registration_identifier', 'idx_clubs_registration_identifier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clubs', function (Blueprint $table) {
            // Drop the index first, then the column
            $table->dropIndex('idx_clubs_registration_identifier');
            $table->dropColumn('registration_identifier');
        });
    }
};
