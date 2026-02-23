import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-lista-usuarios',

  templateUrl: './lista-usuarios.component.html',
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  modal: any;
  usuarioEditar: Usuario | null = null;

  formBuscar = new FormGroup({
    id: new FormControl(''),
  });

  formEditar = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
  });

  constructor(private service: UsuarioService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service
      .listar()

      .subscribe({
        next: (resp) => {
          this.usuarios = resp;
        },

        error: (err) => {
          AlertHelper.error(err.error);
        },
      });
  }

  buscar() {
    const id = this.formBuscar.value.id;

    if (!id) {
      AlertHelper.warning('Ingrese ID');
      return;
    }

    this.service
      .buscar(Number(id))

      .subscribe({
        next: (resp) => {
          this.usuarios = [resp];
        },

        error: (err) => {
          AlertHelper.error(err.error);
        },
      });
  }

  editar(usuario: Usuario) {
    this.usuarioEditar = usuario;

    this.formEditar.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
    });

    this.modal = new bootstrap.Modal(document.getElementById('modalEditar'));
    this.modal.show();
  }

  guardarEdicion() {
    if (!this.usuarioEditar) return;

    if (this.formEditar.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    this.service
      .editar(this.usuarioEditar.id!, this.formEditar.value as Usuario)

      .subscribe({
        next: () => {
          AlertHelper.ok('Usuario actualizado');
          this.modal.hide();

          const index = this.usuarios.findIndex(
            (u) => u.id == this.usuarioEditar!.id,
          );

          if (index != -1) {
            this.usuarios[index] = {
              ...this.usuarios[index],
              nombre: this.formEditar.value.nombre || '',
              email: this.formEditar.value.email || '',
            };
          }
        },

        error: (err) => {
          AlertHelper.error(err.error);
        },
      });
  }

  eliminar(id: number) {
    AlertHelper.confirm('Eliminar usuario', '¿Seguro?').then((r: any) => {
      if (r.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            AlertHelper.ok('Usuario eliminado');

            this.usuarios = this.usuarios.filter((u) => u.id !== id);

            if (this.usuarioEditar?.id === id && this.modal) {
              this.modal.hide();
              this.usuarioEditar = null;
              this.formEditar.reset();
            }
          },
          error: (err) => {
            let mensaje =
              err?.error?.message || err?.message || JSON.stringify(err);
            AlertHelper.error(mensaje);
          },
        });
      }
    });
  }
}
