import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { ClienteEditarDTO } from 'src/app/interfaces/cliente-editar-dto';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
})
export class ListaClientesComponent implements OnInit {
  lista: Cliente[] = [];
  formEditar: FormGroup;
  clienteSeleccionado!: Cliente;

  constructor(private clienteService: ClienteService) {
    this.formEditar = new FormGroup({
      identificacion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.listar().subscribe({
      next: (res) => (this.lista = res),
      error: (err) => AlertHelper.error(err.error),
    });
  }

  // Abrir modal y cargar datos desde el backend usando el ID
  abrirModal(identificacion: string) {
  this.clienteService.buscarPorIdentificacion(identificacion).subscribe({
    next: (cliente) => {
      this.clienteSeleccionado = cliente;
      this.formEditar.patchValue({
        identificacion: cliente.identificacion,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email,
      });

      const modalEl = document.getElementById('modalEditar');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    },
    error: (err) => AlertHelper.error('No se pudo cargar el cliente: ' + err.error),
  });
}


  // Guardar cambios
  guardarEdicion() {
    if (this.formEditar.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    const data: ClienteEditarDTO = this.formEditar.value;

    this.clienteService.editar(this.clienteSeleccionado.id, data).subscribe({
      next: () => {
        AlertHelper.ok('Cliente actualizado');

        // Cerrar modal
        const modalEl = document.getElementById('modalEditar');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        // Recargar toda la lista desde el backend
        this.cargarClientes();
      },
      error: (err) => AlertHelper.error(err.error),
    });
  }
}
