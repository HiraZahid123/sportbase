<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Club;
use App\Models\TrainingGroup;
use App\Models\AthleteProfile;
use App\Models\Contract;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure dummy files exist
        $dummyTemplate = 'contracts/templates/dummy.pdf';
        $dummySigned = 'contracts/signed/dummy_signed.pdf';
        
        if (!Storage::disk('public')->exists($dummyTemplate)) {
            Storage::disk('public')->put($dummyTemplate, '%PDF-1.4 %Dummy PDF content for testing');
        }
        if (!Storage::disk('public')->exists($dummySigned)) {
            Storage::disk('public')->put($dummySigned, '%PDF-1.4 %Dummy Signed PDF content for testing');
        }

        // 1. Create Clubs
        $clubsData = [
            [
                'name' => 'Elite Football Club',
                'email' => 'contact@elitefc.com',
                'status' => 'active',
                'is_paid' => true,
                'groups' => [
                    ['name' => 'Junior Varsity', 'price' => 50, 'schedule' => [['day' => 'Mon', 'time' => '16:00'], ['day' => 'Wed', 'time' => '16:00']]],
                    ['name' => 'Senior Team', 'price' => 100, 'schedule' => [['day' => 'Tue', 'time' => '18:00'], ['day' => 'Thu', 'time' => '18:00'], ['day' => 'Sat', 'time' => '10:00']]],
                ]
            ],
            [
                'name' => 'Golden State Basketball',
                'email' => 'info@gsbasketball.com',
                'status' => 'active',
                'is_paid' => true,
                'groups' => [
                    ['name' => 'Under 16s', 'price' => 75, 'schedule' => [['day' => 'Mon', 'time' => '17:00'], ['day' => 'Fri', 'time' => '17:00']]],
                    ['name' => 'Pro Training', 'price' => 150, 'schedule' => [['day' => 'Daily', 'time' => '08:00']]],
                ]
            ],
            [
                'name' => 'London Lions Swimming',
                'email' => 'swim@londonlions.co.uk',
                'status' => 'active',
                'is_paid' => false,
                'groups' => [
                    ['name' => 'Beginners', 'price' => 40, 'schedule' => [['day' => 'Sat', 'time' => '09:00'], ['day' => 'Sun', 'time' => '09:00']]],
                ]
            ],
            [
                'name' => 'Future Stars Academy (Pending)',
                'email' => 'apply@futurestars.com',
                'status' => 'pending',
                'is_paid' => false,
                'groups' => []
            ],
        ];

        foreach ($clubsData as $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'] . ' Admin',
                    'password' => Hash::make('password'),
                    'role' => 'club',
                    'status' => $data['status'],
                ]
            );

            $club = Club::firstOrNew(['user_id' => $user->id]);
            $club->fill([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => '+44 20 7946 0000',
                'address' => '123 Sports Lane',
                'country' => 'United Kingdom',
                'description' => 'A premier sports club focused on excellence.',
                'is_paid' => $data['is_paid'],
            ]);
            
            if (!$club->exists) {
                $club->registration_identifier = (string) Str::uuid();
            }
            
            $club->save();

            foreach ($data['groups'] as $groupData) {
                $group = TrainingGroup::updateOrCreate(
                    ['club_id' => $club->id, 'name' => $groupData['name']],
                    [
                        'description' => 'Training sessions for ' . $groupData['name'],
                        'schedule_json' => $groupData['schedule'],
                        'price' => $groupData['price'],
                        'max_members' => 30,
                    ]
                );

                // Create some athletes for this group
                for ($i = 1; $i <= 3; $i++) {
                    $athleteEmail = "athlete{$i}." . strtolower(str_replace(' ', '', $group->name)) . "@example.com";
                    $athleteUser = User::updateOrCreate(
                        ['email' => $athleteEmail],
                        [
                            'name' => "Athlete {$i} (" . $group->name . ")",
                            'password' => Hash::make('password'),
                            'role' => 'athlete',
                            'status' => 'active',
                        ]
                    );

                    $profile = AthleteProfile::updateOrCreate(
                        ['user_id' => $athleteUser->id],
                        [
                            'club_id' => $club->id,
                            'training_group_id' => $group->id,
                            'phone' => '+44 7700 90000' . $i,
                            'address' => '456 Athlete Way',
                            'birthday' => '2005-01-01',
                            'sex' => $i % 2 == 0 ? 'male' : 'female',
                            'emergency_contact_json' => ['name' => 'Parent Name', 'phone' => '+44 7700 900555'],
                        ]
                    );

                    if ($i === 1) {
                        Contract::updateOrCreate(
                            ['club_id' => $club->id, 'athlete_id' => $athleteUser->id],
                            [
                                'status' => 'signed',
                                'template_path' => $dummyTemplate,
                                'signed_path' => $dummySigned,
                            ]
                        );
                    }
                }
            }
        }
    }
}
