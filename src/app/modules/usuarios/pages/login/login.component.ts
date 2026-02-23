import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private service: UsuarioService,
    private router: Router,
  ) {}

  login() {
    if (this.form.invalid) {
      AlertHelper.warning('Datos incompletos');
      return;
    }

    this.service
      .login(this.form.value as any)
      .subscribe({
        next: (resp: any) => {
          localStorage.setItem(
            'usuario',
            JSON.stringify(resp),
          );
          AlertHelper.ok('Bienvenido');
          this.router.navigate(['/usuarios/usuarios']);
        },

        error: (err) => {
          AlertHelper.error(err.error);
        },
      });
  }
}
