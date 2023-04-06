<?php
namespace User;

Use User\User;
use User\UserDatabase;
Use Tools\MainController;
Use Tools\Response;

class UserController extends MainController{
    private $route = [];

    /**
     * @param String|null $call: function name
     * Execute function who's called
     * Use to call function from MainController
     * If call is null, try to use default method (get/create/update/delete) switch request type (GET/POST/PUT/DELETE)
     */
    public function __construct($call = null){
        $O_response = new Response();
        if(get_class($this) !== "Tools\MainController"){
            if(in_array ($call ,$this->route) ){
                if(method_exists($this,$call)){
                    $json = file_get_contents('php://input');
                    $T_data = json_decode($json, true);
                    
                    if(empty($T_data)){
                        $T_data = $_GET;
                    }
                    if(empty($T_data)){
                        $T_data = $_POST;
                    }

                    if(!empty($T_data)){
                        call_user_func_array(get_class($this).'::'.$call, $T_data);
                    }else{
                        $this->$call();
                    }
                }else{
                    $O_response->renderResponse(Response::ERROR_CALL);
                }
            }else{ 
                $method = getenv('REQUEST_METHOD');
                switch($method){
                    case 'GET':
                        $link = $_SERVER['PHP_SELF'];
                        $link_array = explode('/',$link);
                        $this::get(end($link_array));
                        break;
                    case 'POST':
                        $json = file_get_contents('php://input');
                        $T_data = json_decode($json);
                        
                        if(empty($T_data)){
                            $T_data = $_POST;
                        }
                        $this::create($T_data);
                        break;
                    case 'PUT':
                        parse_str(file_get_contents("php://input"),$T_data);
                        $this::update($T_data);
                        break;
                    default:
                        $O_response->renderResponse(Response::ERROR_CALL);
                        break;
                }
            }
        }
    }
    
    /**
     * @param int|null $id: User id
     * @return JSON with User object
     * Use to get User object by id
     * If id is null, get all User
     */

    private function get($id = null){
        $O_response = new Response();
        $O_UserDatabase = new UserDatabase();
        if($id){
            $O_User = $O_UserDatabase->getUser($id);
            $data=[
                "id" => $O_User->getId(),
                "username" => $O_User->getUsername(),
                "password" => $O_User->getPassword(),
                "image" => $O_User->getImage(),
                "nb_wins" => $O_User->getNbWins(),
                "nb_fails" => $O_User->getNbFails(),
                "ratio" => $O_User->getRatio(),
                "roles" => $O_User->getRoles()
            ];
        }else{
            $data =[];
            foreach($O_UserDatabase->getAllUser() as $O_User){
                $data[]=[
                    "id" => $O_User->getId(),
                    "username" => $O_User->getUsername(),
                    "password" => $O_User->getPassword(),
                    "image" => $O_User->getImage(),
                    "nb_wins" => $O_User->getNbWins(),
                    "nb_fails" => $O_User->getNbFails(),
                    "ratio" => $O_User->getRatio(),
                    "roles" => $O_User->getRoles()
                ];
            }
        }
        $O_response->renderResponse(Response::SUCCESS_GET, $data);
    }
 
    /**
     * @param Array T_data
     * @return JSON with User object
     */

     private function create($T_data){
        $O_response = new Response();
        $O_User = new User();
        $O_UserDatabase = new UserDatabase();
        $O_User->hydrate($T_data);
        $O_User = $O_UserDatabase->createUser($O_User);
        if($O_User)
            $data=[
                "id" => $O_User->getId(),
                "username" => $O_User->getUsername(),
                "password" => $O_User->getPassword(),
                "image" => $O_User->getImage(),
                "nb_wins" => $O_User->getNbWins(),
                "nb_fails" => $O_User->getNbFails(),
                "ratio" => $O_User->getRatio(),
                "roles" => $O_User->getRoles()
            ];
            
		if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_INSERT, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY);
    }

    /**
     * @param Array T_data
     * @return JSON with User object
     */

    private function update($T_data){
        $O_response = new Response();
        $O_User = new User();
        $O_UserDatabase = new UserDatabase();
        $O_User->hydrate($T_data);
        $O_User = $O_UserDatabase->updateUser($O_User);
        if($O_User)
            $data=[
                "id" => $O_User->getId(),
                "username" => $O_User->getUsername(),
                "password" => $O_User->getPassword(),
                "image" => $O_User->getImage(),
                "nb_wins" => $O_User->getNbWins(),
                "nb_fails" => $O_User->getNbFails(),
                "ratio" => $O_User->getRatio(),
                "roles" => $O_User->getRoles()
            ];
            
		if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_PUT, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY);
    }
}