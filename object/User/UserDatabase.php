<?php

namespace User;

Use User\User;
Use Tools\Database;
Use PDO;

class UserDatabase extends Database{

    /**
     * @return User[] $result
     */
    public function getAllUser(){
        $query = $this->PDO->prepare("SELECT * FROM `user`");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_CLASS, User::class);
    }
    /**
     * @param int $id
     * @return User $O_BDC
     */
    public function getUser($id){
        $query = $this->PDO->prepare("SELECT * FROM `user`
                                      WHERE `id`=:id");
        $query->bindParam(':id', $id);
        $query->execute();
        return $query->fetchObject(User::class);
    }

    /**
	* @param User $O_User
	* @return User
	*/
	public function createUser($O_User){
		$T_row = [];
		$T_insert = [];
		$T_value = [];

		if ($O_User->getId()) {
			$T_row[]="`id`";
			$T_insert[]=":id";
			$T_value[':id'] = $O_User->getId();
		}else{
			$T_row[]="`id`";
			$T_insert[]=":id";
			$T_value[':id'] = uniqid("", true);
        }
        if ($O_User->getUserName()) {
			$T_row[]="`username`";
			$T_insert[]=":username";
			$T_value[':username'] = $O_User->getUserName();
		}
        if ($O_User->getPassword()) {
			$T_row[]="`password`";
			$T_insert[]=":password";
			$T_value[':password'] = $O_User->getPassword();
		}
        if ($O_User->getImage()) {
			$T_row[]="`image`";
			$T_insert[]=":image";
			$T_value[':image'] = $O_User->getImage();
		}
        if ($O_User->getNbWins()) {
			$T_row[]="`nb_wins`";
			$T_insert[]=":nb_wins";
			$T_value[':nb_wins'] = $O_User->getNbWins();
		}
        if ($O_User->getNbFails()) {
			$T_row[]="`nb_fails`";
			$T_insert[]=":nb_fails";
			$T_value[':nb_fails'] = $O_User->getNbFails();
		}
        if ($O_User->getRatio()) {
			$T_row[]="`ratio`";
			$T_insert[]=":ratio";
			$T_value[':ratio'] = $O_User->getRatio();
		}
        if ($O_User->getRoles()) {
			$T_row[]="`roles`";
			$T_insert[]=":roles";
			$T_value[':roles'] = $O_User->getRoles();
		}

		$query = $this->PDO->prepare("INSERT INTO `user`(".implode(",",$T_row).") VALUES (".implode(",",$T_insert).")");
		$query->execute($T_value);
		return $this->getUser($O_User->getId());
    }

    /**
	* @param User $O_User
	* @return User
	*/
	public function updateUser($O_User){
        $T_update = [];
		$T_value = [];
        
		if ($O_User->getUsername()) {
            $T_update[]="`username` =:username";
			$T_value[':username'] = $O_User->getUsername();
		}
        if ($O_User->getPassword()) {
            $T_update[]="`password` =:password";
			$T_value[':password'] = $O_User->getPassword();
		}
        if ($O_User->getImage()) {
            $T_update[]="`image` =:image";
			$T_value[':image'] = $O_User->getImage();
		}
        if ($O_User->getNbWins()) {
            $T_update[]="`nb_wins` =:nb_wins";
			$T_value[':nb_wins'] = $O_User->getNbWins();
		}
        if ($O_User->getNbFails()) {
            $T_update[]="`nb_fails` =:nb_fails";
			$T_value[':nb_fails'] = $O_User->getNbFails();
		}
        if ($O_User->getRatio()) {
            $T_update[]="`ratio` =:ratio";
			$T_value[':ratio'] = $O_User->getRatio();
		}
        if ($O_User->getRoles()) {
            $T_update[]="`roles` =:roles";
			$T_value[':roles'] = $O_User->getRoles();
		}

        $query = $this->PDO->prepare("UPDATE `user` SET ".implode(",",$T_update)." WHERE `id` = :id");
        $T_value[':id']= $O_User->getId();
        $query->execute($T_value);
        return $this->getUser($O_User->getId());
    }
}