<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Repositories\User\Userable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

/**
 * @property Userable $user
 */
class UserController extends Controller
{
    public function __construct(Userable $user)
    {
        $this->user = $user;
    }

    public function register(RegisterUserRequest $request): \Illuminate\Http\JsonResponse
    {
        return $this->user->registration($request);
    }

    public function login(LoginUserRequest $request)
    {
        return $this->user->login($request);
    }

    public function view_profile()
    {
        return $this->user->profile();
    }

    public function logout_user()
    {
        return $this->user->logout();
    }

    public function send_reset_link_response(Request $request)
    {
        return $this->user->sendResetLinkResponse($request);
    }

    public function send_reset_response(Request $request)
    {
        return $this->user->sendResetResponse($request);
    }

    public function reset_password($token)
    {
        Cache::put('reset_token', $token);
        $url = url('/reset-password');

        return redirect($url);
    }

    public function passwordResetToken()
    {
        return Cache::get('reset_token');
    }
}
