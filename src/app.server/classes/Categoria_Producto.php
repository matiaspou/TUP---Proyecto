<?php

class CategoriaProducto {
    private int $id_categoria;
    private string $nombre_categoria;

    public function __construct(int $id_categoria, string $nombre_categoria) {
        $this->id_categoria = $id_categoria;
        $this->nombre_categoria = $nombre_categoria;
    }

    public function getIdCategoria(): int {
        return $this->id_categoria;
    }

    public function setIdCategoria(int $id_categoria): void {
        $this->id_categoria = $id_categoria;
    }

    public function getNombreCategoria(): string {
        return $this->nombre_categoria;
    }

    public function setNombreCategoria(string $nombre_categoria): void {
        $this->nombre_categoria = $nombre_categoria;
    }
}

?>