<?php

namespace App\Repository;

use App\Repository\RepositoryInterface;
use App\Models\Member;
use App\Traits\ApiResponse;
use Illuminate\Database\QueryException;

class MemberRepository extends BaseRepository implements RepositoryInterface
{
    use ApiResponse;
    protected $model;

    public function __construct(Member $model)
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

    public function updateBalance($request, $id)
    {
        try {
            $data = $this->update($id, $request->all());
            return $this->okApiResponse('Saldo berhasil diupdate', $this->findById($request->id));
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }
}
