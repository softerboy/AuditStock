<?php

use App\Models\AuditLog;
use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

test('only admin can access audit log page', function () {
    $user = User::factory()->create(['role' => 'user']);
    $admin = User::factory()->create(['role' => 'admin']);

    actingAs($user)->get('/audit')->assertStatus(403);
    actingAs($admin)->get('/audit')->assertStatus(200);
});

test('audit log page displays logs', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    actingAs($admin);

    Product::create([
        'title' => 'Audit Test Product',
        'quantity' => 5,
        'price' => 50,
    ]);

    $response = get('/audit');
    $response->assertStatus(200);
    $response->assertSee('Audit Test Product');
    $response->assertSee('created');
});

test('audit log page can be filtered by date', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    actingAs($admin);

    // Create a log in the past
    $oldLog = AuditLog::factory()->create([
        'created_at' => now()->subDays(10),
        'event' => 'old_event',
        'auditable_type' => Product::class,
        'auditable_id' => 1,
    ]);

    // Create a log today
    $newLog = AuditLog::factory()->create([
        'created_at' => now(),
        'event' => 'new_event',
        'auditable_type' => Product::class,
        'auditable_id' => 2,
    ]);

    // Filter for today only
    $response = get('/audit?from='.now()->format('Y-m-d'));
    $response->assertStatus(200);
    $response->assertSee('new_event');
    $response->assertDontSee('old_event');

    // Filter for the past
    $response = get('/audit?to='.now()->subDays(5)->format('Y-m-d'));
    $response->assertStatus(200);
    $response->assertSee('old_event');
    $response->assertDontSee('new_event');
});
