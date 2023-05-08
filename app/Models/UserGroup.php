<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    use HasFactory;
    
    CONST ADMIN = 1;
    CONST USER = 2;

    protected $fillable = [
        'id',
        'name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
