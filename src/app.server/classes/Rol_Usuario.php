<?php

class RolUsuario {
    private int $id_rol;
    private string $nombre_rol;
    private string $permisos;

    // Constructor
    public function __construct(int $id_rol, string $nombre_rol, string $permisos) {
        $this->id_rol = $id_rol;
        $this->nombre_rol = $nombre_rol;
        $this->permisos = $permisos;
    }

    // Getters
    public function getIdRol(): int {
        return $this->id_rol;
    }

    public function getNombreRol(): string {
        return $this->nombre_rol;
    }

    public function getPermisos(): string {
        return $this->permisos;
    }

    // Setters
    public function setIdRol(int $id_rol): void {
        $this->id_rol = $id_rol;
    }

    public function setNombreRol(string $nombre_rol): void {
        $this->nombre_rol = $nombre_rol;
    }

    public function setPermisos(string $permisos): void {
        $this->permisos = $permisos;
    }
}


?>