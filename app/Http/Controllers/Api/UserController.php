<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        UserResource::collection(
            User::query()->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): Response
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): Response
    {
        $data = $request->validated();
        if ($data['password']) {
            # code...
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): Response
    {
        $user->delete();
        return response('',204);
    }
}
