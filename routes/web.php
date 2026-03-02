<?php

use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/products')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('products', ProductController::class);
    Route::get('audit', [AuditLogController::class, 'index'])->name('audit.index');
});

require __DIR__.'/settings.php';
