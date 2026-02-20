<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::post("/webhook", [StudentController::class, "webhook"])->name("student.webhook");

