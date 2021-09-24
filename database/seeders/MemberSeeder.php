<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
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
                'username'  => 'aufulkirom',
                'password'  => 'aufulkirom',
            ],
            [
                'username'  => 'shivamatahari',
                'password'  => 'shivamatahari',
            ],
            [
                'username'  => 'ilhamibrahim',
                'password'  => 'ilhamibrahim',
            ],
        ];
        foreach ($datas as $data) {
            Member::create($data);
        }
    }
}
