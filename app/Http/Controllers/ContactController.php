<?php

namespace App\Http\Controllers;

use App\Models\CompanySetting;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $office = config('company.office');
        $company = CompanySetting::current();

        return Inertia::render('Contact', [
            'location' => [
                'label' => $office['label'],
                'address' => $office['address'],
                'position' => [$office['latitude'], $office['longitude']],
                'zoom' => $office['zoom'],
            ],
        ])->withViewData(['seo' => array_merge(
            pageSeo(
                'Kontak Jasa Cargo & Ekspedisi Banjarmasin',
                "Hubungi ATTA Cargo, jasa pengiriman barang Banjarmasin & ekspedisi Kalimantan Selatan. Telepon {$company->phone} atau email {$company->email}.",
                '/kontak',
            ),
            ['breadcrumbs' => [
                ['name' => 'Beranda', 'url' => url('/')],
                ['name' => 'Kontak', 'url' => url('/kontak')],
            ]],
        )]);
    }

    public function store(Request $request): RedirectResponse
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
