<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

Route::get("/", [StudentController::class, "index"])->name("student.index");
Route::get("/refresh", [StudentController::class, "refresh"])->name("student.refresh");
Route::get('/data', function () {
  return response()->json(Cache::get('students_m', []));
});
