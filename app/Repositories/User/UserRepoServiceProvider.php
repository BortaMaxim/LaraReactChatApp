<?php
namespace App\Repositories\User;

use App\Http\Controllers\UserController;
use Illuminate\Support\ServiceProvider;

class UserRepoServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(Userable::class, UserService::class);
    }
}
