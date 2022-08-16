<?php
namespace App\Repositories\User;


interface Userable
{
    public function registration($request);
    public function login($request);
    public function logout();
    public function profile();
    public function sendResetLinkResponse($request);
    public function sendResetResponse($request);
}
