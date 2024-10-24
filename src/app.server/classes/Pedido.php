<?php

class Pedido {
    private int $id_pedido;
    private int $id_usuario;
    private string $fecha_pedido; // Formato: "YYYY-MM-DD"
    private string $estado_general;
    private string $estado_pago;
    private string $estado_envio;
    private string $forma_de_pago;
    private int $descuento;
    private float $precio_total;
    private string $metodo_de_entrega;
    private ?float $precio_de_envio; // Puede ser null

    public function __construct(int $id_usuario, string $fecha_pedido, string $estado_general, string $estado_pago, string $estado_envio, string $forma_de_pago, int $descuento, float $precio_total, string $metodo_de_entrega, ?float $precio_de_envio = null) {
        $this->id_usuario = $id_usuario;
        $this->fecha_pedido = $fecha_pedido;
        $this->estado_general = $estado_general;
        $this->estado_pago = $estado_pago;
        $this->estado_envio = $estado_envio;
        $this->forma_de_pago = $forma_de_pago;
        $this->descuento = $descuento;
        $this->precio_total = $precio_total;
        $this->metodo_de_entrega = $metodo_de_entrega;
        $this->precio_de_envio = $precio_de_envio;
    }

    public function getIdPedido(): int {
        return $this->id_pedido;
    }

    public function setIdPedido(int $id_pedido): void {
        $this->id_pedido = $id_pedido;
    }

    public function getIdUsuario(): int {
        return $this->id_usuario;
    }

    public function setIdUsuario(int $id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public function getFechaPedido(): string {
        return $this->fecha_pedido;
    }

    public function setFechaPedido(string $fecha_pedido): void {
        $this->fecha_pedido = $fecha_pedido;
    }

    public function getEstadoGeneral(): string {
        return $this->estado_general;
    }

    public function setEstadoGeneral(string $estado_general): void {
        $this->estado_general = $estado_general;
    }

    public function getEstadoPago(): string {
        return $this->estado_pago;
    }

    public function setEstadoPago(string $estado_pago): void {
        $this->estado_pago = $estado_pago;
    }

    public function getEstadoEnvio(): string {
        return $this->estado_envio;
    }

    public function setEstadoEnvio(string $estado_envio): void {
        $this->estado_envio = $estado_envio;
    }

    public function getFormaDePago(): string {
        return $this->forma_de_pago;
    }

    public function setFormaDePago(string $forma_de_pago): void {
        $this->forma_de_pago = $forma_de_pago;
    }

    public function getDescuento(): int {
        return $this->descuento;
    }

    public function setDescuento(int $descuento): void {
        $this->descuento = $descuento;
    }

    public function getPrecioTotal(): float {
        return $this->precio_total;
    }

    public function setPrecioTotal(float $precio_total): void {
        $this->precio_total = $precio_total;
    }

    public function getMetodoDeEntrega(): string {
        return $this->metodo_de_entrega;
    }

    public function setMetodoDeEntrega(string $metodo_de_entrega): void {
        $this->metodo_de_entrega = $metodo_de_entrega;
    }

    public function getPrecioDeEnvio(): ?float {
        return $this->precio_de_envio;
    }

    public function setPrecioDeEnvio(?float $precio_de_envio): void {
        $this->precio_de_envio = $precio_de_envio;
    }
}


?>