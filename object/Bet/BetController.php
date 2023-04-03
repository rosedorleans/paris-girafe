<?php
namespace Bet;

Use Bet\Bet;
use Bet\BetDatabase;
Use Tools\MainController;
Use Tools\Response;

class BetController extends MainController{
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
     * @param int|null $id: Bet id
     * @return JSON with Bet object
     * Use to get Bet object by id
     * If id is null, get all Bet
     */

    private function get($id = null){
        $O_response = new Response();
        $O_betDatabase = new BetDatabase();
        if($id){
            $O_bet = $O_betDatabase->getBet($id);
            $data=[
                "id" => $O_bet->getId(),
                "name" => $O_bet->getName(),
                "description" => $O_bet->getDescription(),
                "statut" => $O_bet->getStatut()
            ];
        }else{
            $data =[];
            foreach($O_betDatabase->getAllBet() as $O_bet){
                $data[]=[
                    "id" => $O_bet->getId(),
                    "name" => $O_bet->getName(),
                    "description" => $O_bet->getDescription(),
                    "statut" => $O_bet->getStatut()
                ];
            }
        }
        $O_response->renderResponse(Response::SUCCESS_GET, $data);
    }
 

    /**
     * @param Array T_data
     * @return JSON with Bet object
     */

     private function create($T_data){
        $O_response = new Response();
        $O_bet = new Bet();
        $O_betDatabase = new BetDatabase();
        $O_bet->hydrate($T_data);
        $O_bet = $O_betDatabase->createBet($O_bet);
        if($O_bet)
            $data=[
                "id" => $O_bet->getId(),
                "name" => $O_bet->getName(),
                "description" => $O_bet->getDescription(),
                "statut" => $O_bet->getStatut()
            ];
            
		if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_INSERT, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY);
    }

    /**
     * @param Array T_data
     * @return JSON with Bet object
     */

    private function update($T_data){
        $O_response = new Response();
        $O_bet = new Bet();
        $O_betDatabase = new BetDatabase();
        $O_bet->hydrate($T_data);
        $O_bet = $O_betDatabase->updateBet($O_bet);
        if($O_bet)
            $data=[
                "id" => $O_bet->getId(),
                "name" => $O_bet->getName(),
                "description" => $O_bet->getDescription(),
                "statut" => $O_bet->getStatut()
            ];
            
		if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_PUT, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY);
    }
}