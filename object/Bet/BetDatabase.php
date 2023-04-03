<?php

namespace Bet;

Use Bet\Bet;
Use Tools\Database;
Use Slack\Slack;
Use PDO;

class BetDatabase extends Database{

    /**
     * @return Bet[] $result
     */
    public function getAllBet(){
        $query = $this->PDO->prepare("SELECT * FROM `bet`");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_CLASS, Bet::class);
    }
    /**
     * @param int $id
     * @return Bet $O_BDC
     */
    public function getBet($id){
        $query = $this->PDO->prepare("SELECT * FROM `bet`
                                      WHERE `id`=:id");
        $query->bindParam(':id', $id);
        $query->execute();
        return $query->fetchObject(Bet::class);
    }

    /**
	* @param Bet $O_bet
	* @return Bet
	*/
	public function createBet($O_bet){
		$T_row = [];
		$T_insert = [];
		$T_value = [];

		if ($O_bet->getId()) {
			$T_row[]="`id`";
			$T_insert[]=":id";
			$T_value[':id'] = $O_bet->getId();
		}else{
			$T_row[]="`id`";
			$T_insert[]=":id";
			$T_value[':id'] = uniqid("", true);
        }
        if ($O_bet->getName()) {
			$T_row[]="`name`";
			$T_insert[]=":name";
			$T_value[':name'] = $O_bet->getName();
		}
        if ($O_bet->getDescription()) {
			$T_row[]="`description`";
			$T_insert[]=":description";
			$T_value[':description'] = $O_bet->getDescription();
		}
        if ($O_bet->getStatut()) {
			$T_row[]="`statut`";
			$T_insert[]=":statut";
			$T_value[':statut'] = $O_bet->getStatut();
		}

		$query = $this->PDO->prepare("INSERT INTO `bet`(".implode(",",$T_row).") VALUES (".implode(",",$T_insert).")");
		$query->execute($T_value);
		return $this->getBet($O_bet->getId());
    }

    /**
	* @param Bet $O_bet
	* @return Bet
	*/
	public function updateBet($O_bet){
        $T_update = [];
		$T_value = [];
        
		if ($O_bet->getName()) {
            $T_update[]="`name` =:name";
			$T_value[':name'] = $O_bet->getName();
		}
        if ($O_bet->getDescription()) {
            $T_update[]="`description` =:description";
			$T_value[':description'] = $O_bet->getDescription();
		}
        if ($O_bet->getStatut()) {
            $T_update[]="`statut` =:statut";
			$T_value[':statut'] = $O_bet->getStatut();
		}

        $query = $this->PDO->prepare("UPDATE `bet` SET ".implode(",",$T_update)." WHERE `id` = :id");
        $T_value[':id']= $O_bet->getId();
        $query->execute($T_value);
        return $this->getBet($O_bet->getId());
    }
}