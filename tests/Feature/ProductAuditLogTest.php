<?php

use App\Models\AuditLog;
use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

test('it logs product creation', function () {
    $user = User::factory()->create();

    actingAs($user);

    $product = Product::create([
        'title' => 'Test Product',
        'quantity' => 10,
        'price' => 100,
    ]);

    assertDatabaseHas('audit_logs', [
        'user_id' => $user->id,
        'auditable_type' => Product::class,
        'auditable_id' => $product->id,
        'event' => 'created',
    ]);

    $log = AuditLog::latest()->first();
    expect($log->new_values['title'])->toBe('Test Product');
});

test('it logs product update', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create([
        'title' => 'Original Title',
    ]);

    actingAs($user);

    $product->update([
        'title' => 'Updated Title',
    ]);

    assertDatabaseHas('audit_logs', [
        'user_id' => $user->id,
        'auditable_type' => Product::class,
        'auditable_id' => $product->id,
        'event' => 'updated',
    ]);

    $log = AuditLog::where('event', 'updated')->latest()->first();
    expect($log->old_values['title'])->toBe('Original Title');
    expect($log->new_values['title'])->toBe('Updated Title');
});

test('it logs product deletion', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    actingAs($user);

    $productId = $product->id;
    $productAttributes = $product->getAttributes();
    $product->delete();

    assertDatabaseHas('audit_logs', [
        'user_id' => $user->id,
        'auditable_type' => Product::class,
        'auditable_id' => $productId,
        'event' => 'deleted',
    ]);

    $log = AuditLog::where('event', 'deleted')->latest()->first();
    expect($log->old_values['title'])->toBe($productAttributes['title']);
});
