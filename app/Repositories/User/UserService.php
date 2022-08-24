<?php

namespace App\Repositories\User;

use App\Events\UserOffline;
use App\Events\UserOnline;
use App\Models\User;
use ErrorException;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserService implements Userable
{
    public User $user;
    public $confirm_verified_url = "https://mailtrap.io/inboxes/1841493/messages/2917711337";

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function registration($request): \Illuminate\Http\JsonResponse
    {
        $request->validated();

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];
        $user = $this->user->create($data);
        event(new Registered($user));

        return response()->json([
            'success' => true,
            'message' => 'AuthForm Successfully!  Please confirm your email on ' . $this->confirm_verified_url,
        ], 200);
    }

    public function login($request)
    {
        $request->validated();
        $credentials = $request->only('email', 'password');
        $user = $this->user->where('email', $credentials['email'])->first();
        if ($user) {
            if (!auth()->attempt($credentials)) {
                $responseMessage = "Invalid username or password";
                return response()->json([
                    "success" => false,
                    "message" => $responseMessage,
                    "error" => $responseMessage
                ], 422);
            }
            $email_verified = auth()->user()->email_verified_at;
            if ($email_verified === null) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please confirm your email! '. $this->confirm_verified_url
                ]);
            } else {
                $accessToken = auth()->user()->createToken('accessToken')->accessToken;
                $user->status = 'online';
                $user->save();
                $responseMessage = "Login Successful";
                return response()->json([
                    'success' => true,
                    'message' => $responseMessage,
                    'data' => $user,
                    'token' => $accessToken
                ]);
            }
        } else {
            $responseMessage = "Sorry, this user does not exist";
            return response()->json([
                "success" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
            ]);
        }
    }

    function logout(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::guard('api')->user()->token();
        $auth_user = auth()->user();
        $auth_user->status = 'offline';
        $auth_user->save();
        $user->revoke();
        $responseMessage = "Successfully logged out ";
        return response()->json([
            'success' => true,
            'message' => $responseMessage,
        ]);
    }

    function profile(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'data' => auth()->user(),
        ]);
    }

    public function sendResetLinkResponse($request): \Illuminate\Http\JsonResponse
    {
       $request->validate([
           'email' => 'required|email'
       ]);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true, 'message' => 'success'])
            : response()->json(['success' => false, 'message' => 'fail']);
    }

    public function sendResetResponse($request): \Illuminate\Http\JsonResponse
    {
        $input = $request->only('email','token', 'password', 'password_confirmation');
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $response = Password::reset($input, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        $message = $response == Password::PASSWORD_RESET ? 'Password reset successfully' : 'Please write new password';
        return response()->json([
            'message' => $message,
        ]);
    }

    public function updateProfile($request)
    {

        $request->validated();
        $avatar_path = $request->avatar;
        if ($avatar = $request->file('avatar')) {
            $avatar->move('avatars', $avatar_path);
        }

        $auth_user = auth()->user();
        $auth_user->name = $request->name;
        $auth_user->email = $request->email;
        $auth_user->avatar = $avatar_path;
        $auth_user->save();

        return response()->json([
            'success' => true,
            'message' => 'user updated!',
            'data' => $auth_user,
        ]);
    }
}
