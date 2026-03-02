<?php

test('it redirects root to products', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect('/products');
});
