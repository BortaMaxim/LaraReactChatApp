<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Repositories\User\Userable;
use Illuminate\Http\Request;

/**
 * @property Userable userable
 */
class ProfileController extends Controller
{

    public function __construct(Userable $userable)
    {
        $this->userable = $userable;
    }

    public function update_profile(UpdateProfileRequest $request)
    {
        return $this->userable->updateProfile($request);
    }
}
