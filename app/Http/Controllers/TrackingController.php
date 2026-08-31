<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class TrackingController extends Controller
{
    public function __invoke(): View
    {
        return view('tracking');
    }
}
