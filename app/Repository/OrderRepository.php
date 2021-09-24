<?php

namespace App\Repository;

use App\Repository\RepositoryInterface;
use App\Models\HistoryOrder;
use App\Models\Member;
use App\Models\Order;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class OrderRepository extends BaseRepository implements RepositoryInterface
{
    use ApiResponse;
    protected $orderModel;
    protected $productModel;
    protected $memberModel;

    public function __construct(Order $orderModel, Product $productModel, Member $memberModel)
    {
        $this->orderModel = $orderModel;
        $this->productModel = $productModel;
        $this->memberModel = $memberModel;
    }

    public function getAll()
    {
        try {
            $data = $this->orderModel->all(['*'],['product', 'member']);
            return $this->okApiResponse('OK', $data);
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }

    public function memberOrder($request)
    {
        try {
            $data = $this->orderModel->create($request->all());
            $product = $this->productModel->find($request->product_id);
            $member = $this->memberModel->find(Auth::guard('member-api')->user()->id);
            $product->update([
                'stock' => $product->stock - $request->qty
            ]);
            $member->update([
                'balance' => $member->balance - $request->total
            ]);
            return $this->okApiResponse('Order berhasil', $data);
        } catch (QueryException $q) {
            return $this->badRequestApiResponse($q->error);
        }
    }
}
