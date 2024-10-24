<?php

class Compras {
    private int $id_compra;
    private int $id_producto;
    private int $id_proveedor;
    private string $fecha_compra;
    private int $cantidad;
    private float $precio_unitario;

    public function __construct(int $id_compra, int $id_producto, int $id_proveedor, string $fecha_compra, int $cantidad, float $precio_unitario) {
        $this->id_compra = $id_compra;
        $this->id_producto = $id_producto;
        $this->id_proveedor = $id_proveedor;
        $this->fecha_compra = $fecha_compra;
        $this->cantidad = $cantidad;
        $this->precio_unitario = $precio_unitario;
    }

    public function getIdCompra(): int {
        return $this->id_compra;
    }

    public function setIdCompra(int $id_compra): void {
        $this->id_compra = $id_compra;
    }

    public function getIdProducto(): int {
        return $this->id_producto;
    }

    public function setIdProducto(int $id_producto): void {
        $this->id_producto = $id_producto;
    }

    public function getIdProveedor(): int {
        return $this->id_proveedor;
    }

    public function setIdProveedor(int $id_proveedor): void {
        $this->id_proveedor = $id_proveedor;
    }

    public function getFechaCompra(): string {
        return $this->fecha_compra;
    }

    public function setFechaCompra(string $fecha_compra): void {
        $this->fecha_compra = $fecha_compra;
    }

    public function getCantidad(): int {
        return $this->cantidad;
    }

    public function setCantidad(int $cantidad): void {
        $this->cantidad = $cantidad;
    }

    public function getPrecioUnitario(): float {
        return $this->precio_unitario;
    }

    public function setPrecioUnitario(float $precio_unitario): void {
        $this->precio_unitario = $precio_unitario;
    }
}


?>