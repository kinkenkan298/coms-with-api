<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get("/", [StudentController::class, "index"])->name("student.index");
Route::get("/refresh", [StudentController::class, "refresh"])->name("student.refresh");
Route::post("/webhook", [StudentController::class, "webhook"])->name("student.webhook");
