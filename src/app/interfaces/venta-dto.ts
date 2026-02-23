export interface DetalleVentaDTO {
  productoId: number;
  cantidad: number;
}

export interface VentaDTO {
  clienteId: number;
  usuarioId: number;
  detalles: DetalleVentaDTO[];
}
