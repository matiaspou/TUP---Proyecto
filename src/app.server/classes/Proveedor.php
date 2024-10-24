<?php

class Proveedor {
    private int $id_proveedor;
    private string $nombre_proveedor;
    private string $mail;
    private string $telefono;
    private ?string $direccion;
    private int $id_provincia;

    // Constructor
    public function __construct(int $id_proveedor, string $nombre_proveedor, string $mail, string $telefono, ?string $direccion, int $id_provincia) {
        $this->id_proveedor = $id_proveedor;
        $this->nombre_proveedor = $nombre_proveedor;
        $this->mail = $mail;
        $this->telefono = $telefono;
        $this->direccion = $direccion;
        $this->id_provincia = $id_provincia;
    }

    // Getters
    public function getIdProveedor(): int {
        return $this->id_proveedor;
    }

    public function getNombreProveedor(): string {
        return $this->nombre_proveedor;
    }

    public function getMail(): string {
        return $this->mail;
    }

    public function getTelefono(): string {
        return $this->telefono;
    }

    public function getDireccion(): ?string {
        return $this->direccion;
    }

    public function getIdProvincia(): int {
        return $this->id_provincia;
    }

    // Setters
    public function setIdProveedor(int $id_proveedor): void {
        $this->id_proveedor = $id_proveedor;
    }

    public function setNombreProveedor(string $nombre_proveedor): void {
        $this->nombre_proveedor = $nombre_proveedor;
    }

    public function setMail(string $mail): void {
        $this->mail = $mail;
    }

    public function setTelefono(string $telefono): void {
        $this->telefono = $telefono;
    }

    public function setDireccion(?string $direccion): void {
        $this->direccion = $direccion;
    }

    public function setIdProvincia(int $id_provincia): void {
        $this->id_provincia = $id_provincia;
    }
}


?>
