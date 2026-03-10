<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        try {
            $data = json_decode(
                file_get_contents(storage_path('data/skills.json')), true
            );
            return response()->json([
                'success' => true,
                'data'    => $data,
                'message' => 'Skills obtenidas correctamente'
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
