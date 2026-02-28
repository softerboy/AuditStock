<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (! $this->shouldSeedDevUsers()) {
            $this->call(ProductSeeder::class);

            return;
        }

        $this->seedDevUsers();

        $this->call(ProductSeeder::class);
    }

    private function shouldSeedDevUsers(): bool
    {
        return app()->environment(['local', 'testing']);
    }

    private function seedDevUsers(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@mail.com',
            'role' => 'admin',
            'password' => Hash::make('admin'),
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@mail.com',
            'role' => 'user',
            'password' => Hash::make('user'),
        ]);
    }
}
