<?php

namespace App\Repository;

use App\Repository\RepositoryInterface;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Database\QueryException;

class ProductRepository extends BaseRepository implements RepositoryInterface
{
    use ApiResponse;
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        try {
            $data = $this->all();
            return $this->okApiResponse('Data ', $data);
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }

    public function updateProduct($request, $id)
    {
        try {
            $this->update($id, $request->all());
            return $this->okApiResponse('Produk berhasil diupdate', $this->findById($request->id));
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }

    public function storeProduct($request)
    {
        try {
            $data = $this->create($request->all());
            return $this->okApiResponse('Produk berhasil ditambahkan', $this->findById($data->id));
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }

    public function deleteProduct($id)
    {
        try {
            $this->deleteById($id);
            return $this->okApiResponse('Produk berhasil dihapus');
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }

}
