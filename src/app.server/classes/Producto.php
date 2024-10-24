<?php

class Producto {
    private int $id_producto;
    private ?string $nombre_producto;
    private ?string $descripcion;
    private float $precio;
    private ?string $url_imagen;
    private ?int $id_categoria;
    private ?int $id_proveedor;
    private ?int $interacciones;
    private string $marca;

    // Constructor
    public function __construct(int $id_producto, ?string $nombre_producto, ?string $descripcion, float $precio, ?string $url_imagen, ?int $id_categoria, ?int $id_proveedor, ?int $interacciones, string $marca) {
        $this->id_producto = $id_producto;
        $this->nombre_producto = $nombre_producto;
        $this->descripcion = $descripcion;
        $this->precio = $precio;
        $this->url_imagen = $url_imagen;
        $this->id_categoria = $id_categoria;
        $this->id_proveedor = $id_proveedor;
        $this->interacciones = $interacciones;
        $this->marca = $marca;
    }

    // Getters
    public function getIdProducto(): int {
        return $this->id_producto;
    }

    public function getNombreProducto(): ?string {
        return $this->nombre_producto;
    }

    public function getDescripcion(): ?string {
        return $this->descripcion;
    }

    public function getPrecio(): float {
        return $this->precio;
    }

    public function getUrlImagen(): ?string {
        return $this->url_imagen;
    }

    public function getIdCategoria(): ?int {
        return $this->id_categoria;
    }

    public function getIdProveedor(): ?int {
        return $this->id_proveedor;
    }

    public function getInteracciones(): ?int {
        return $this->interacciones;
    }

    public function getMarca(): string {
        return $this->marca;
    }

    // Setters
    public function setIdProducto(int $id_producto): void {
        $this->id_producto = $id_producto;
    }

    public function setNombreProducto(?string $nombre_producto): void {
        $this->nombre_producto = $nombre_producto;
    }

    public function setDescripcion(?string $descripcion): void {
        $this->descripcion = $descripcion;
    }

    public function setPrecio(float $precio): void {
        $this->precio = $precio;
    }

    public function setUrlImagen(?string $url_imagen): void {
        $this->url_imagen = $url_imagen;
    }

    public function setIdCategoria(?int $id_categoria): void {
        $this->id_categoria = $id_categoria;
    }

    public function setIdProveedor(?int $id_proveedor): void {
        $this->id_proveedor = $id_proveedor;
    }

    public function setInteracciones(?int $interacciones): void {
        $this->interacciones = $interacciones;
    }

    public function setMarca(string $marca): void {
        $this->marca = $marca;
    }
}


?>