<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('admin can access product management', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get(route('products.index'));

    $response->assertStatus(200);
});

test('admin can create a product', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->post(route('products.store'), [
        'title' => 'New Product',
        'quantity' => 10,
        'price' => 99.99,
    ]);

    $response->assertRedirect(route('products.index'));
    $this->assertDatabaseHas('products', ['title' => 'New Product']);
});

test('regular user can see products but cannot create', function () {
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user)->get(route('products.index'));
    $response->assertStatus(200);

    $response = $this->actingAs($user)->post(route('products.store'), [
        'title' => 'Forbidden Product',
        'quantity' => 10,
        'price' => 99.99,
    ]);

    $response->assertStatus(403);
});

test('regular user cannot edit or delete products', function () {
    $user = User::factory()->create(['role' => 'user']);
    $product = Product::factory()->create();

    $response = $this->actingAs($user)->put(route('products.update', $product), [
        'title' => 'Updated Title',
        'quantity' => 5,
        'price' => 50.00,
    ]);
    $response->assertStatus(403);

    $response = $this->actingAs($user)->delete(route('products.destroy', $product));
    $response->assertStatus(403);
});
