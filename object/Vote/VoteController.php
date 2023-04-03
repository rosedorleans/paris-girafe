<?php
namespace Vote;

Use Vote\Vote;
use Vote\VoteDatabase;
Use Tools\MainController;
Use Tools\Response;

class VoteController extends MainController{
    private $route = ["getVotesByBetId"];

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
     * @param int|null $id: Vote id
     * @return JSON with Vote object
     * Use to get Vote object by id
     * If id is null, get all Vote
     */

    private function get($id = null){
        $O_response = new Response();
        $O_voteDatabase = new VoteDatabase();
        if($id){
            $O_vote = $O_voteDatabase->getVote($id);
            $data=[
                "id" => $O_vote->getId(),
                "date" => $O_vote->getDate(),
                "bet_id" => $O_vote->getBetId(),
                "user_id" => $O_vote->getUserId()
            ];
        }else{
            $data =[];
            foreach($O_voteDatabase->getAllVote() as $O_vote){
                $data[]=[
                    "id" => $O_vote->getId(),
                    "date" => $O_vote->getDate(),
                    "bet_id" => $O_vote->getBetId(),
                    "user_id" => $O_vote->getUserId()
                ];
            }
        }
        $O_response->renderResponse(Response::SUCCESS_GET, $data);
    }


        /**
     * @param int|null $id: Vote id
     * @return JSON with Vote object
     * Use to get Vote object by id
     * If id is null, get all Vote
     */

     private function getVotesByBetId($betId){

        $O_response = new Response();
        $O_voteDatabase = new VoteDatabase();

        $T_O_vote = $O_voteDatabase->getVotesByBetId($betId);
        $data = [];
        if($T_O_vote){
            foreach($T_O_vote as $O_vote){
                $data[]=[
                    "id" => $O_vote->getId(),
                    "date" => $O_vote->getDate(),
                    "bet_id" => $O_vote->getBetId(),
                    "user_id" => $O_vote->getUserId()
                ];
            };
        }
        if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_GET, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY); 
    }
 

    /**
     * @param Array T_data
     * @return JSON with Vote object
     */

     private function create($T_data){
        $O_response = new Response();
        $O_vote = new Vote();
        $O_voteDatabase = new VoteDatabase();
        $O_vote->hydrate($T_data);
        $O_vote = $O_voteDatabase->createVote($O_vote);
        if($O_vote)
            $data=[
                "id" => $O_vote->getId(),
                "date" => $O_vote->getDate(),
                "bet_id" => $O_vote->getBetId(),
                "user_id" => $O_vote->getUserId()
            ];
            
		if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_INSERT, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY);
    }

    /**
     * @param Array T_data
     * @return JSON with Vote object
     */

    private function update($T_data){
        $O_response = new Response();
        $O_vote = new Vote();
        $O_voteDatabase = new VoteDatabase();
        $O_vote->hydrate($T_data);
        $O_vote = $O_voteDatabase->updateVote($O_vote);
        if($O_vote)
            $data=[
                "id" => $O_vote->getId(),
                "date" => $O_vote->getDate(),
                "bet_id" => $O_vote->getBetId(),
                "user_id" => $O_vote->getUserId()
            ];
            
		if(!empty($data))
            $O_response->renderResponse(Response::SUCCESS_PUT, $data);
        else
            $O_response->renderResponse(Response::ERROR_GET_EMPTY);
    }
}