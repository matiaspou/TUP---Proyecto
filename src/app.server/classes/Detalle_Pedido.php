<?php
class DetallePedido {
    private int $id_detalle;
    private int $id_pedido;
    private int $id_producto;
    private int $cantidad;
    private float $precio_unitario;

    public function __construct(int $id_detalle, int $id_pedido, int $id_producto, int $cantidad, float $precio_unitario) {
        $this->id_detalle = $id_detalle;
        $this->id_pedido = $id_pedido;
        $this->id_producto = $id_producto;
        $this->cantidad = $cantidad;
        $this->precio_unitario = $precio_unitario;
    }

    public function getIdDetalle(): int {
        return $this->id_detalle;
    }

    public function setIdDetalle(int $id_detalle): void {
        $this->id_detalle = $id_detalle;
    }

    public function getIdPedido(): int {
        return $this->id_pedido;
    }

    public function setIdPedido(int $id_pedido): void {
        $this->id_pedido = $id_pedido;
    }

    public function getIdProducto(): int {
        return $this->id_producto;
    }

    public function setIdProducto(int $id_producto): void {
        $this->id_producto = $id_producto;
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