<?php

namespace App\Http\Controllers;

use App\Events\SiswaUpdate;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    private string $cache_key = "students_female";
    private string $gender = "Perempuan";
    private string $main_url;
    public function __construct()
    {
        $this->main_url = config("UTAMA_APP_URL", "http://localhost:3001/v1");
    }
    public function index()
    {
        $siswa = Cache::get($this->cache_key);
        if ($siswa === null) {
            $siswa = $this->fetchSiswa();
        }
        $total = count($siswa);
        $last_updated = Cache::get($this->cache_key . "_last-updated", "-");
        return view("student.index", compact("siswa", "total", "last_updated"));
    }
    public function webhook(Request $request): JsonResponse
    {
        $event = $request->input("event");
        $data = $request->input("data");
        $timestamp = $request->input("timestamp");

        if (!isset($data['jenis_kelamin'])) {
            return response()->json(['status' => false, 'message' => 'field jenis_kelamin tidak ada']);
        }

        $currentData = Cache::get($this->cache_key, []);

        switch ($event) {
            case 'CREATE':
                if ($data['jenis_kelamin'] === $this->gender) {
                    $currentData[] = $data;
                    Cache::put($this->cache_key, $currentData);
                    Log::info("[CLIENT-DUA] CREATE: Berhasil menambahkan siswa baru");
                }
                break;
            case 'UPDATE':
                $currentData = array_filter($currentData, fn($d) => $d['_id'] !== $data['_id']);
                $currentData = array_values($currentData);
                if ($data['jenis_kelamin'] === $this->gender) {
                    array_unshift($currentData, $data);
                }
                Cache::put($this->cache_key, $currentData);
                Log::info("[CLIENT-DUA]: UPDATE: Berhasil mengubah data siswa");
                break;
            case 'DELETE':
                $currentData = array_filter($currentData, fn($n) => $n['_id'] !== $data['_id']);
                $currentData = array_values($currentData);
                Cache::put($this->cache_key, $currentData);
                Log::info("[CLIEN-DUA] DELETE: Berhasil menghapus siswa");
                break;
        }
        Cache::put($this->cache_key . "_last-updated", now());
        broadcast(new SiswaUpdate($event, $data));
        return response()->json(['status' => true, 'message' => 'data berhasil di terima']);
    }
    public function fetchSiswa(): array
    {
        try {
            $response = Http::timeout(5)->get("{$this->main_url}/students?gender=FEMALE");
            if ($response->successful()) {
                $data = $response->json('data', []);
                Cache::put($this->cache_key, $data, 60);
                Cache::put($this->cache_key . "_last-updated", now()->toDateTimeString());
                Log::info("[CLIENT-DUA] Data siswa berhasil diambil dan disimpan ke cache.");

                return $data;
            }
        } catch (Exception $e) {
            Log::error("Terjadi kesalahan saat mengambil data siswa: {$e->getMessage()}");
        }
        return [];
    }
    public function refresh(): RedirectResponse
    {
        Cache::forget($this->cache_key);
        Cache::forget($this->cache_key . "_last-updated");
        $this->fetchSiswa();
        return redirect()->route("students.index")->with("success", "Data siswa berhasil di refresh");
    }
    public function getData(): JsonResponse
    {
        $siswa = Cache::get($this->cache_key);
        if ($siswa === null) {
            $siswa = $this->fetchSiswa();
        }
        return response()->json($siswa);
    }
}
