<?php

namespace User;

Use Tools\Entity;

class User extends Entity {

    private $id;
    private $username;
    private $password;
    private $image;
    private $nb_wins;
    private $nb_fails;
    private $ratio;
    private $roles;

    public function getId()
    {
        return $this->id;
    }
    
    public function getUsername()
    {
        return $this->username;
    }
    
    public function setUsername($username): self
    {
        $this->username = $username;
    
        return $this;
    }
    
    public function getPassword()
    {
        return $this->password;
    }
    
    public function setPassword($password): self
    {
        $this->password = $password;
    
        return $this;
    }

    public function getImage()
    {
        return $this->image;
    }
    
    public function setImage($image): self
    {
        $this->image = $image;
    
        return $this;
    }

    public function getNbWins()
    {
        return $this->nb_wins;
    }
    
    public function setNbWins($nb_wins): self
    {
        $this->nb_wins = $nb_wins;
    
        return $this;
    }

    public function getNbFails()
    {
        return $this->nb_fails;
    }
    
    public function setNbFails($nb_fails): self
    {
        $this->nb_fails = $nb_fails;
    
        return $this;
    }

    public function getRatio()
    {
        return $this->ratio;
    }
    
    public function setRatio($ratio): self
    {
        $this->ratio = $ratio;
    
        return $this;
    }

    public function getRoles()
    {
        return $this->roles;
    }
    
    public function setRoles($roles): self
    {
        $this->roles = $roles;
    
        return $this;
    }
}
