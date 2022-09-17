<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('user-status', function ($user) {
    return true;
});
