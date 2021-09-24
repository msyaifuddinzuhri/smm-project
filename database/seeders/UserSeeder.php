<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $datas = [
            [
                'username'  => 'administrator',
                'password'  => 'administrator',
            ],
            [
                'username'  => 'syaifuddin',
                'password'  => 'syaifuddin',
            ],
        ];
        foreach ($datas as $data) {
            User::create($data);
        }
    }
}
