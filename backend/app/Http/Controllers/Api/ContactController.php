<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nombre' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'mensaje' => 'required|string|max:1000'
            ]);

            // Here you would typically send an email or save to database
            // For now, we'll just return a success response
            
            return response()->json([
                'success' => true,
                'data' => [
                    'nombre' => $validated['nombre'],
                    'email' => $validated['email'],
                    'mensaje' => $validated['mensaje']
                ],
                'message' => 'Mensaje de contacto recibido correctamente'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Error al procesar el mensaje'
            ], 500);
        }
    }
}
