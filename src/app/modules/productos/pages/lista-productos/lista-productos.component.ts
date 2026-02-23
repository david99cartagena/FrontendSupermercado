import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { ProductoEditarDTO } from 'src/app/interfaces/producto-editar-dto';
import { AlertHelper } from 'src/app/helpers/alert.helper';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
})
export class ListaProductosComponent implements OnInit {
  lista: Producto[] = [];
  formEditar: FormGroup;
  productoSeleccionado!: Producto;

  constructor(private productoService: ProductoService) {
    this.formEditar = new FormGroup({
      codigoProducto: new FormControl('', Validators.required),
      nombreProducto: new FormControl('', Validators.required),
      valorUnitario: new FormControl<number>(0, Validators.required),
      unidadesDisponibles: new FormControl<number>(0, Validators.required),
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: (res) => (this.lista = res),
      error: (err) => AlertHelper.error(err.error),
    });
  }

  abrirModal(id: number) {
    this.productoService.buscar(id).subscribe({
      next: (p) => {
        this.productoSeleccionado = p;
        this.formEditar.patchValue({
          codigoProducto: p.codigoProducto,
          nombreProducto: p.nombreProducto,
          valorUnitario: p.valorUnitario,
          unidadesDisponibles: p.unidadesDisponibles,
        });

        const modalEl = document.getElementById('modalEditarProducto');
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      },
      error: (err) =>
        AlertHelper.error('No se pudo cargar el producto: ' + err.error),
    });
  }

  guardarEdicion() {
    if (this.formEditar.invalid) {
      AlertHelper.warning('Formulario incompleto');
      return;
    }

    const data: ProductoEditarDTO = {
      codigoProducto: this.formEditar.value.codigoProducto!,
      nombreProducto: this.formEditar.value.nombreProducto!,
      valorUnitario: this.formEditar.value.valorUnitario!,
      unidadesDisponibles: this.formEditar.value.unidadesDisponibles!,
    };

    this.productoService.editar(this.productoSeleccionado.id, data).subscribe({
      next: () => {
        AlertHelper.ok('Producto actualizado');
        const modalEl = document.getElementById('modalEditarProducto');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        this.cargarProductos();
      },
      error: (err) => AlertHelper.error(err.error),
    });
  }

  eliminarProducto(id: number) {
    if (!confirm('¿Desea eliminar este producto?')) return;

    this.productoService.eliminar(id).subscribe({
      next: () => {
        AlertHelper.ok('Producto eliminado');
        this.cargarProductos();
      },
      error: (err) => AlertHelper.error(err.error),
    });
  }
}
