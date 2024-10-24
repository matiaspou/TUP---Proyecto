<?php

class Usuario {
    private int $id_usuario;
    private string $email;
    private string $password;
    private int $id_rol;
    private ?string $nombre;
    private ?string $apellido;
    private ?string $razon_social;
    private ?bool $persona_fisica;

    // Constructor
    public function __construct(int $id_usuario, string $email, string $password, int $id_rol, ?string $nombre = null, ?string $apellido = null, ?string $razon_social = null, ?bool $persona_fisica = null) {
        $this->id_usuario = $id_usuario;
        $this->email = $email;
        $this->password = $password;
        $this->id_rol = $id_rol;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->razon_social = $razon_social;
        $this->persona_fisica = $persona_fisica;
    }

    // Getters
    public function getIdUsuario(): int {
        return $this->id_usuario;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function getIdRol(): int {
        return $this->id_rol;
    }

    public function getNombre(): ?string {
        return $this->nombre;
    }

    public function getApellido(): ?string {
        return $this->apellido;
    }

    public function getRazonSocial(): ?string {
        return $this->razon_social;
    }

    public function getPersonaFisica(): ?bool {
        return $this->persona_fisica;
    }

    // Setters
    public function setIdUsuario(int $id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public function setEmail(string $email): void {
        $this->email = $email;
    }

    public function setPassword(string $password): void {
        $this->password = $password;
    }

    public function setIdRol(int $id_rol): void {
        $this->id_rol = $id_rol;
    }

    public function setNombre(?string $nombre): void {
        $this->nombre = $nombre;
    }

    public function setApellido(?string $apellido): void {
        $this->apellido = $apellido;
    }

    public function setRazonSocial(?string $razon_social): void {
        $this->razon_social = $razon_social;
    }

    public function setPersonaFisica(?bool $persona_fisica): void {
        $this->persona_fisica = $persona_fisica;
    }
}


?>