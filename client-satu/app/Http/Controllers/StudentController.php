<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    private string $mainUrl;
    private string $cacheKey = 'students_m';
    public function __construct()
    {
        $this->mainUrl = env("UTAMA_APP_URL", "http://localhost:3001/v1");
    }
    public function index()
    {
        $siswa = Cache::get($this->cacheKey);
        if ($siswa === null) {
            $siswa = $this->fetchData();
        }
        $total = count($siswa);
        $lastUpdate = Cache::get($this->cacheKey . '_last_update', '-');
        return view("student.index", compact("siswa", "total", "lastUpdate"));
    }
    private function fetchData(): array
    {

        try {
            $resp = Http::timeout(5)->get("{$this->mainUrl}/students?gender=MALE");
            if ($resp->successful()) {
                $data = $resp->json('data', []);
                Cache::put($this->cacheKey, $data);
                Cache::put($this->cacheKey . '_last_update', now()->toDateTimeString());

                return $data;
            }

        } catch (\Exception $e) {
            Log::error("[CLIENT-SATU] Gagal mengambil data dari server utama: " . $e->getMessage());
        }
        return [];
    }
    public function refresh()
    {
        Cache::forget($this->cacheKey);
        Cache::forget($this->cacheKey . '_last_update');
        $this->fetchData();
        return redirect()->route("student.index")->with("status", "Data refreshed at " . now()->toDateTimeString());
    }
    public function webhook(Request $request)
    {

    }
}
