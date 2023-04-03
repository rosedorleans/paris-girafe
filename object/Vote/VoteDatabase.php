<?php

namespace Vote;

Use Vote\Vote;
Use Tools\Database;
Use PDO;

class VoteDatabase extends Database{

    /**
     * @return Vote[] $result
     */
    public function getAllVote(){
        $query = $this->PDO->prepare("SELECT * FROM `vote`");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_CLASS, Vote::class);
    }
    /**
     * @param int $id
     * @return Vote $O_BDC
     */
    public function getVote($id){
        $query = $this->PDO->prepare("SELECT * FROM `vote`
                                      WHERE `id`=:id");
        $query->bindParam(':id', $id);
        $query->execute();
        return $query->fetchObject(Vote::class);
    }

	    /**
     * @param int $betId
     * @return Vote $O_BDC
     */
    public function getVotesByBetId($betId){
        $query = $this->PDO->prepare("SELECT * FROM `vote`
                                      WHERE `bet_id`=:betId");
        $query->bindParam(':betId', $betId);
        $query->execute();
        return $query->fetchObject(Vote::class);
    }

    /**
	* @param Vote $O_vote
	* @return Vote
	*/
	public function createVote($O_vote){
		$T_row = [];
		$T_insert = [];
		$T_value = [];

		if ($O_vote->getId()) {
			$T_row[]="`id`";
			$T_insert[]=":id";
			$T_value[':id'] = $O_vote->getId();
		}else{
			$T_row[]="`id`";
			$T_insert[]=":id";
			$T_value[':id'] = uniqid("", true);
        }
        if ($O_vote->getDate()) {
			$T_row[]="`date`";
			$T_insert[]=":date";
			$T_value[':date'] = $O_vote->getDate();
		}
        if ($O_vote->getBetId()) {
			$T_row[]="`bet_id`";
			$T_insert[]=":bet_id";
			$T_value[':bet_id'] = $O_vote->getBetId();
		}
        if ($O_vote->getUserId()) {
			$T_row[]="`user_id`";
			$T_insert[]=":user_id";
			$T_value[':user_id'] = $O_vote->getUserId();
		}

		$query = $this->PDO->prepare("INSERT INTO `vote`(".implode(",",$T_row).") VALUES (".implode(",",$T_insert).")");
		$query->execute($T_value);
		return $this->getVote($O_vote->getId());
    }

    /**
	* @param Vote $O_vote
	* @return Vote
	*/
	public function updateVote($O_vote){
        $T_update = [];
		$T_value = [];
        
		if ($O_vote->getDate()) {
            $T_update[]="`date` =:date";
			$T_value[':date'] = $O_vote->getDate();
		}
        if ($O_vote->getBetId()) {
            $T_update[]="`bet_id` =:bet_id";
			$T_value[':bet_id'] = $O_vote->getBetId();
		}
        if ($O_vote->getUserId()) {
            $T_update[]="`user_id` =:user_id";
			$T_value[':user_id'] = $O_vote->getUserId();
		}

        $query = $this->PDO->prepare("UPDATE `vote` SET ".implode(",",$T_update)." WHERE `id` = :id");
        $T_value[':id']= $O_vote->getId();
        $query->execute($T_value);
        return $this->getVote($O_vote->getId());
    }
}