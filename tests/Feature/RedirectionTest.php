<?php

use App\Models\User;

test('it redirects root to products', function () {
    $response = $this->get('/');

    $response->assertRedirect('/products');
});

test('it returns 404 for dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(404);
});
