<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    /**
     * Get all products.
     */
    public function getAllProducts(): Collection
    {
        return Product::all();
    }

    /**
     * Create a new product.
     */
    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    /**
     * Update an existing product.
     */
    public function updateProduct(Product $product, array $data): bool
    {
        return $product->update($data);
    }

    /**
     * Delete a product.
     */
    public function deleteProduct(Product $product): bool
    {
        return $product->delete();
    }
}
