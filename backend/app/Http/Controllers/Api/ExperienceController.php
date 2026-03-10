<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        try {
            $data = json_decode(
                file_get_contents(storage_path('data/experience.json')), true
            );
            return response()->json([
                'success' => true,
                'data'    => $data,
                'message' => 'Experiencia obtenida correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data'    => null,
                'message' => 'Error al leer los datos'
            ], 500);
        }
    }
}
