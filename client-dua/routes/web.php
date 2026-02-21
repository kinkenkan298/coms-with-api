<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get("/", [StudentController::class, "index"])->name("students.index");
Route::get("/refresh", [StudentController::class, "refresh"])->name("students.refresh");
Route::get("/data", [StudentController::class, "getData"])->name("student.data");