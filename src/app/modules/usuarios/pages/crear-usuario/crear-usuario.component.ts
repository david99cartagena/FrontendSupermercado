import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
})
export class CrearUsuarioComponent {
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private service: UsuarioService,
    private router: Router,
  ) {}

  guardar() {
    if (this.form.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    this.service.crear(this.form.value as any).subscribe({
      next: () => {
        AlertHelper.ok('Usuario creado');
        this.router.navigate(['/usuarios/usuarios']);
      },

      error: (err) => {
        AlertHelper.error(err.error);
      },
    });
  }
}
