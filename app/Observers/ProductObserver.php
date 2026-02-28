<?php

namespace App\Observers;

use App\Models\AuditLog;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        AuditLog::create([
            'user_id' => Auth::id(),
            'auditable_type' => $product::class,
            'auditable_id' => $product->id,
            'event' => 'created',
            'new_values' => $product->getAttributes(),
        ]);
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        $oldValues = $product->getOriginal();
        $newValues = $product->getDirty();

        // Ensure we only log if there were actual changes in tracked fields
        if (empty($newValues)) {
            return;
        }

        AuditLog::create([
            'user_id' => Auth::id(),
            'auditable_type' => $product::class,
            'auditable_id' => $product->id,
            'event' => 'updated',
            'old_values' => array_intersect_key($oldValues, $newValues),
            'new_values' => $newValues,
        ]);
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        AuditLog::create([
            'user_id' => Auth::id(),
            'auditable_type' => $product::class,
            'auditable_id' => $product->id,
            'event' => 'deleted',
            'old_values' => $product->getAttributes(),
        ]);
    }
}
