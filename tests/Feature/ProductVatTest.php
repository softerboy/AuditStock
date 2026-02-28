<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('product list page contains shared vat and products', function () {
    $user = User::factory()->create();
    Product::factory()->count(3)->create();

    $vat = config('app.vat');

    $response = $this->actingAs($user)->get(route('products.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('products/index')
        ->has('products', 3)
        ->where('vat', $vat)
    );
});
