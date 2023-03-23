<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        // Validação de credenciais de usuário aqui

        // Autenticação bem-sucedida
        return response()->json(['message' => 'Autenticado com sucesso']);

        // Autenticação falhou
        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }
}
