import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { ClienteCrearDTO } from 'src/app/interfaces/cliente-crear-dto';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
})
export class CrearClienteComponent {
  // FormGroup tipado para no permitir null
  form = new FormGroup({
    identificacion: new FormControl<string>('', Validators.required),
    nombre: new FormControl<string>('', Validators.required),
    apellido: new FormControl<string>('', Validators.required),
    direccion: new FormControl<string>('', Validators.required),
    telefono: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  guardar() {
    if (this.form.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    const data: ClienteCrearDTO = {
      identificacion: this.form.value.identificacion!,
      nombre: this.form.value.nombre!,
      apellido: this.form.value.apellido!,
      direccion: this.form.value.direccion!,
      telefono: this.form.value.telefono!,
      email: this.form.value.email!,
    };

    this.clienteService.crear(data).subscribe({
      next: () => {
        AlertHelper.ok('Cliente creado');
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        AlertHelper.error(err.error);
      },
    });
  }
}
