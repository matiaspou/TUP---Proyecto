<?php

class Provincia {
    private int $id_provincia;
    private string $nombre_provincia;

    // Constructor
    public function __construct(int $id_provincia, string $nombre_provincia) {
        $this->id_provincia = $id_provincia;
        $this->nombre_provincia = $nombre_provincia;
    }

    // Getters
    public function getIdProvincia(): int {
        return $this->id_provincia;
    }

    public function getNombreProvincia(): string {
        return $this->nombre_provincia;
    }

    // Setters
    public function setIdProvincia(int $id_provincia): void {
        $this->id_provincia = $id_provincia;
    }

    public function setNombreProvincia(string $nombre_provincia): void {
        $this->nombre_provincia = $nombre_provincia;
    }
}



?>