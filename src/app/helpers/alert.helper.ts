import Swal from 'sweetalert2';

export class AlertHelper {
  static ok(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: 'OK',
      text: mensaje,
    });
  }

  static error(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  }

  static warning(mensaje: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Aviso',
      text: mensaje,
    });
  }

  static confirm(titulo: string, texto: string) {
    return Swal.fire({
      icon: 'warning',
      title: titulo,
      text: texto,
      showCancelButton: true,
      confirmButtonText: 'Sí eliminar',
      cancelButtonText: 'Cancelar'
    });
  }
}
