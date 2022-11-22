<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    public $timestamps = true;
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    protected $fillable = ['name', 'phone', 'email', 'password', 'device_id'];

    public function articles()
    {
        return $this->hasMany(Article::Class);
    }

    public function devices()
    {
        return $this->hasOne(Device::Class, 'id', 'device_id');
    }
}
