<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'needs' => ['required', 'string', 'max:2000'],
            'destination_city' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
        ]);

        ContactSubmission::create($validated);

        return back()->with('flash', ['success' => 'Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.']);
    }
}
