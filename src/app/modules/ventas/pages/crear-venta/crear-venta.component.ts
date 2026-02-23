import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertHelper } from 'src/app/helpers/alert.helper';
import { VentaDTO } from 'src/app/interfaces/venta-dto';
import { VentasService } from '../../services/venta.service';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css'],
})
export class CrearVentaComponent implements OnInit {
  form!: FormGroup;
  clientes: any[] = [];
  usuarios: any[] = [];
  productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ventasService: VentasService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      clienteId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      detalles: this.fb.array([]),
    });

    // Traer clientes, usuarios y productos del API
    this.cargarDatosVenta();

    // agregamos un detalle por defecto
    this.agregarDetalle();
  }

  get detalles() {
    return this.form.get('detalles') as FormArray;
  }

  agregarDetalle() {
    const detalle = this.fb.group({
      productoId: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });
    this.detalles.push(detalle);
  }

  eliminarDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  cargarDatosVenta() {
    this.ventasService.datosVenta().subscribe({
      next: (res) => {
        this.clientes = res.clientes;
        this.usuarios = res.usuarios;
        this.productos = res.productos;
      },
      error: (err) =>
        AlertHelper.error(err.error || 'Error al cargar datos de venta'),
    });
  }

  guardar() {
    if (this.form.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    const data: VentaDTO = this.form.value;

    this.ventasService.crearVenta(data).subscribe({
      next: (res) => AlertHelper.ok(`Venta creada #${res.ventaId}`),
      error: (err) => AlertHelper.error(err.error || 'Error al crear venta'),
    });
  }
}
