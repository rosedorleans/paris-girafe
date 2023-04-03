<?php

namespace Bet;

Use Tools\Entity;
use Tools\Enum;

class Bet extends Entity {

    private $id;
    private $name;
    private $description;
    private $statut;

    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getName(): ?string
    {
        return $this->name;
    }
    
    public function setName(string $name): self
    {
        $this->name = $name;
    
        return $this;
    }
    
    public function __toString()
    {
        return $this->name;
    }
    
    public function getDescription(): ?string
    {
        return $this->description;
    }
    
    public function setDescription(?string $description): self
    {
        $this->description = $description;
    
        return $this;
    }
    
    public function getStatut()
    {
        return $this->statut;
    }
    
    public function setStatut(int $statut): self
    {
        $this->statut = $statut;
    
        return $this;
    }
}
