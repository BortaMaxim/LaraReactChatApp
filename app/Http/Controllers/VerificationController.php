<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        $user = User::find($request->route('id'));
        $clientUrl = 'http://localhost:8000';

        if ($user->hasVerifiedEmail()) {
            return redirect("$clientUrl/email-already-verified");
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect("$clientUrl/email-verified-success");
    }
}
