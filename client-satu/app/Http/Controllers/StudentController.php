<?php

namespace App\Http\Controllers;

use App\Events\SiswaUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    private string $mainUrl;
    private string $cacheKey = 'students_m';
    private string $gender = 'Laki Laki';
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
            Log::error("[CLIENT-1] Gagal mengambil data dari server utama: " . $e->getMessage());
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
        $event = $request->input('event');
        $data = $request->input('data');
        $timestamp = $request->input('timestamp', now()->toDateTimeString());

        if (!isset($data['jenis_kelamin'])) {
            return response()->json(['status' => 'ignored', 'reason' => 'No gender field']);
        }

        $currentData = Cache::get($this->cacheKey, []);
        switch ($event) {
            case 'CREATE':
                if ($data['jenis_kelamin'] === $this->gender) {
                    $currentData[] = $data;
                    Cache::put($this->cacheKey, $currentData);
                    Log::info("[Client1] CREATE: Siswa laki-laki baru: {$data['nama']}");
                }
                break;

            case 'UPDATE':
                $currentData = array_filter($currentData, fn($s) => $s['_id'] !== $data['_id']);
                $currentData = array_values($currentData);
                if ($data['jenis_kelamin'] === $this->gender) {
                    array_unshift($currentData, $data);
                }
                Cache::put($this->cacheKey, $currentData);
                Log::info("[Client1] UPDATE: Siswa {$data['nama']} diupdate");
                break;

            case 'DELETE':
                $currentData = array_filter($currentData, fn($s) => $s['_id'] !== $data['_id']);
                $currentData = array_values($currentData);
                Cache::put($this->cacheKey, $currentData);
                Log::info("[Client1] DELETE: Siswa {$data['nama']} dihapus");
                break;
        }

        Cache::put($this->cacheKey . '_last_update', date('Y-m-d H:i:s'));
        broadcast(new SiswaUpdate($event, $data));
        return response()->json([
            'status' => 'ok',
        ]);
    }
}
