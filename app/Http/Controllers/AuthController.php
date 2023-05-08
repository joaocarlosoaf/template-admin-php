<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\BaseController;
use App\Models\UserGroup;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    
    public function register(Request $request)
    {

        try {

            $validatedData = $request->validate([
                'name' => 'required|max:55',
                'email' => 'required|email|unique:users',
                'password' => 'required'
            ]);
    
            $validatedData['password'] = bcrypt($request->password);
    
            $user = User::create($validatedData);
            $userGroup = UserGroup::create([
                'user_id' => $user->id,
                'group_id' => 1
            ]);
    
            $accessToken = $user->createToken('authToken')->accessToken;
            
            return $this->sendResponse([ 'user' => $user, 'access_token' => $accessToken], 'User created!', 201);
        
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError($e->errors(), 422);
        } catch (\Throwable $th) {
            error_log($th);
            return $this->sendError('Error', 500);
        }
       
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|max:55',
                'email' => 'required|email'
            ]);

            $user = User::find($id);
            $user->name = $validatedData['name'];
            $user->email = $validatedData['email'];
            $user->save();

            return $this->sendResponse(['user' => $user], 'User updated!', 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError($e->errors(), 422);
        } catch (\Throwable $th) {
            error_log($th);
            return $this->sendError('Error', 500);
        }
        
    }


    public function login(Request $request)
    {
        try {
            
            $loginData = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if (!auth()->attempt($loginData)) {
                return $this->sendError('Invalid credentials', 500);
            }
    
            $tokenResult = auth()->user()->createToken('authToken', ['admin', 'user']);
            $accessToken = $tokenResult->accessToken->token;

            return $this->sendResponse(
                ['user' => auth()->user(), 'access_token' => $accessToken],
                'User logged in!',
                200
            );

        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError($e->errors(), 422);
        } catch (\Throwable $th) {
            error_log($th);
            return $this->sendError('Error', 500);
        }

       
    }


    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return $this->sendResponse([], 'User logged out!', 200);
    }



}
