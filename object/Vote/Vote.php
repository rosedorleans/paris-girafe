<?php

namespace Vote;

Use Tools\Entity;

class Vote extends Entity {

    private $id;
    private $date;
    private $bet_id;
    private $user_id;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): self
    {
        $this->id = $id;
    
        return $this;
    }
    
    public function getDate()
    {
        return $this->date;
    }
    
    public function setDate($date): self
    {
        $this->date = $date;
    
        return $this;
    }
    
    public function getBetId()
    {
        return $this->bet_id;
    }
    
    public function setBetId($bet_id): self
    {
        $this->bet_id = $bet_id;
    
        return $this;
    }

    public function getUserId()
    {
        return $this->user_id;
    }
    
    public function setUserId($user_id): self
    {
        $this->user_id = $user_id;
    
        return $this;
    }
}
