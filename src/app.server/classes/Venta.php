<?php

class Venta {
    private int $id_venta;
    private int $id_producto;
    private int $id_usuario;
    private string $fecha_venta;
    private int $cantidad;
    private float $precio_total;

    // Constructor
    public function __construct(int $id_venta, int $id_producto, int $id_usuario, string $fecha_venta, int $cantidad, float $precio_total) {
        $this->id_venta = $id_venta;
        $this->id_producto = $id_producto;
        $this->id_usuario = $id_usuario;
        $this->fecha_venta = $fecha_venta;
        $this->cantidad = $cantidad;
        $this->precio_total = $precio_total;
    }

    // Getters
    public function getIdVenta(): int {
        return $this->id_venta;
    }

    public function getIdProducto(): int {
        return $this->id_producto;
    }

    public function getIdUsuario(): int {
        return $this->id_usuario;
    }

    public function getFechaVenta(): string {
        return $this->fecha_venta;
    }

    public function getCantidad(): int {
        return $this->cantidad;
    }

    public function getPrecioTotal(): float {
        return $this->precio_total;
    }

    // Setters
    public function setIdVenta(int $id_venta): void {
        $this->id_venta = $id_venta;
    }

    public function setIdProducto(int $id_producto): void {
        $this->id_producto = $id_producto;
    }

    public function setIdUsuario(int $id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public function setFechaVenta(string $fecha_venta): void {
        $this->fecha_venta = $fecha_venta;
    }

    public function setCantidad(int $cantidad): void {
        $this->cantidad = $cantidad;
    }

    public function setPrecioTotal(float $precio_total): void {
        $this->precio_total = $precio_total;
    }
}


?>