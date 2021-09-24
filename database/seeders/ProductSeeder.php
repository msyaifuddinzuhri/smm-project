<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
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
                'name'  => 'Produk 1',
                'price'  => 120000,
                'stock'  => 10,
            ],
            [
                'name'  => 'Produk 2',
                'price'  => 70000,
                'stock'  => 7,
            ],
            [
                'name'  => 'Produk 3',
                'price'  => 50000,
                'stock'  => 5,
            ],
        ];
        foreach ($datas as $data) {
            Product::create($data);
        }
    }
}
