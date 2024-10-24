<?php

class Stock {
    private int $id_stock;
    private int $id_producto;
    private int $cantidad;
    private string $fecha_ingreso;

    // Constructor
    public function __construct(int $id_stock, int $id_producto, int $cantidad, string $fecha_ingreso) {
        $this->id_stock = $id_stock;
        $this->id_producto = $id_producto;
        $this->cantidad = $cantidad;
        $this->fecha_ingreso = $fecha_ingreso;
    }

    // Getters
    public function getIdStock(): int {
        return $this->id_stock;
    }

    public function getIdProducto(): int {
        return $this->id_producto;
    }

    public function getCantidad(): int {
        return $this->cantidad;
    }

    public function getFechaIngreso(): string {
        return $this->fecha_ingreso;
    }

    // Setters
    public function setIdStock(int $id_stock): void {
        $this->id_stock = $id_stock;
    }

    public function setIdProducto(int $id_producto): void {
        $this->id_producto = $id_producto;
    }

    public function setCantidad(int $cantidad): void {
        $this->cantidad = $cantidad;
    }

    public function setFechaIngreso(string $fecha_ingreso): void {
        $this->fecha_ingreso = $fecha_ingreso;
    }
}


?>