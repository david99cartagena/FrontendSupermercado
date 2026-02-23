import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ProductoCrearDTO } from 'src/app/interfaces/producto-crear-dto';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/helpers/alert.helper';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
})
export class CrearProductoComponent {
  form = new FormGroup({
    codigoProducto: new FormControl('', Validators.required),
    nombreProducto: new FormControl('', Validators.required),
    valorUnitario: new FormControl<number>(0, Validators.required),
    unidadesDisponibles: new FormControl<number>(0, Validators.required),
  });

  constructor(
    private productoService: ProductoService,
    private router: Router,
  ) {}

  guardar() {
    if (this.form.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    const data: ProductoCrearDTO = {
      codigoProducto: this.form.value.codigoProducto!,
      nombreProducto: this.form.value.nombreProducto!,
      valorUnitario: this.form.value.valorUnitario!,
      unidadesDisponibles: this.form.value.unidadesDisponibles!,
    };

    this.productoService.crear(data).subscribe({
      next: () => {
        AlertHelper.ok('Producto creado');
        this.router.navigate(['/productos']);
      },
      error: (err) => AlertHelper.error(err.error),
    });
  }
}
