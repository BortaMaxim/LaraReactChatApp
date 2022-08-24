<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
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

Route::group(['prefix' => 'auth', ',middleware' => 'cors'], function ($router) {
    Route::post('register', [UserController::class, 'register']);
    Route::get('email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
        ->middleware(['signed', 'throttle'])
        ->name('verification.verify');
    Route::post('login', [UserController::class, 'login']);
    Route::post('password/forgot-password', [UserController::class, 'send_reset_link_response'])
        ->middleware('guest')->name('password.email');
    Route::get('/password/reset/{token}', [UserController::class, 'reset_password'])
        ->middleware('guest')
        ->name('password.reset');
    Route::post('password/reset', [UserController::class, 'send_reset_response'])
        ->name('password.update');
    Route::get('password-reset-token', [UserController::class, 'passwordResetToken']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('profile', [UserController::class, 'view_profile']);
        Route::post('update-profile', [ProfileController::class, 'update_profile']);
        Route::get('logout', [UserController::class, 'logout_user']);
    });
});
