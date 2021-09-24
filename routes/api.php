<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::post('login', [AuthController::class, 'adminLogin']);

        Route::middleware(['auth:admin-api'])->group(function () {
            Route::post('logout', [AuthController::class, 'adminLogout']);
            Route::resource('member', MemberController::class);
            Route::resource('product', ProductController::class);
            Route::resource('order', OrderController::class);
        });
    });

    Route::prefix('member')->group(function () {
        Route::post('login', [AuthController::class, 'memberLogin']);
        Route::post('register', [AuthController::class, 'memberRegister']);
        Route::middleware(['auth:member-api'])->group(function () {
            Route::post('logout', [AuthController::class, 'memberlogout']);
            Route::get('get-products', [ProductController::class, 'getProducts']);
            Route::post('new-order', [OrderController::class, 'memberOrder']);
        });
    });
});
