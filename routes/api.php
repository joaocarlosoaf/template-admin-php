<?php

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->group(function () {
    Route::put('/users/{id}', [App\Http\Controllers\AuthController::class, 'update']);
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
});

Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);

Route::prefix('inscription')->group(function () {
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
});