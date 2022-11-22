<?php


namespace App\Services;

use App\Constants\Common;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;



class UserService extends BaseService
{
    public function __construct(Request $r)
    {
        parent::__construct($r);
    }



    protected function setModel()
    {
        $this->model = new User();
    }

    public function _addFilter()
    {
        $this->query->where('role', '=', Common::ROLE_USER)->with('devices:id,name,location');
    }

    /**
     * Change user infor
     */

    public function updateUser($id, Request $r)
    {
        $user = $this->model->findOrFail($id);

        $input = $r->only(['name', 'phone', 'email', 'password', 'device_id']);

        if (isset($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        }

        $user->fill($input)->save();
        return $user;
    }

    public function disableUser($id)
    {

        $user = $this->model->find($id);

        if (!$user) {
            // TODO: Can throw exception
            return false;
        }
        $user->status = Common::DISABLE;
        $user->save();
        return $user;
    }

    public function activeUser($id)
    {

        $user = $this->model->find($id);

        if (!$user) {
            // TODO: Can throw exception
            return false;
        }
        $user->status = Common::ACTIVE;
        $user->save();
        return $user;
    }
}
