<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    
    /**
    * success response method.
    *
    * @return \Illuminate\Http\Response
    */
    public function sendResponse($result, $message, $code = 200)
    {
    	$response = [
            'erro' => false,
            'data'    => $result,
            'msg' => $message,
        ];


        return response()->json($response, $code);
    }


    /**
    * return error response.
    *
    * @return \Illuminate\Http\Response
    */
    public function sendError($error, $code = 500)
    {
    	$response = [
            'erro' => true,
            'msg' => $error,
        ];

        return response()->json($response, $code);
    }

}
