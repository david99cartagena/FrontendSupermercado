import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  formReporte!: FormGroup;
  tipoReporte: string = '';

  constructor(
    private fb: FormBuilder,
    private reportService: ReporteService,
  ) {}

  ngOnInit(): void {
    this.formReporte = this.fb.group({
      tipo: [''],
      fecha: [''],
      fechaInicio: [''],
      fechaFin: [''],
      anio: [''],
      mes: [''],
    });
  }

  onTipoReporteChange() {
    this.tipoReporte = this.formReporte.value.tipo;
  }

  generarReporte() {
    const tipo = this.tipoReporte;

    switch (tipo) {
      case 'diario':
        this.reportService
          .reporteDiario(this.formReporte.value.fecha)
          .subscribe((res) => this.verificarYExportar(res));
        break;
      case 'semanal':
        this.reportService
          .reporteSemanal(
            this.formReporte.value.fechaInicio,
            this.formReporte.value.fechaFin,
          )
          .subscribe((res) => this.verificarYExportar(res));
        break;
      case 'mensual':
        this.reportService
          .reporteMensual(
            this.formReporte.value.anio,
            this.formReporte.value.mes,
          )
          .subscribe((res) => this.verificarYExportar(res));
        break;
      case 'anual':
        this.reportService
          .reporteAnual(this.formReporte.value.anio)
          .subscribe((res) => this.verificarYExportar(res));
        break;
    }
  }

  // Función que verifica si hay datos antes de exportar
  verificarYExportar(data: any) {
    const ventas = data.ventas || data.Ventas || [];
    if (!ventas || ventas.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin datos',
        text: 'No se encontraron registros para este reporte',
      });
      return;
    }

    this.exportarExcel(ventas);
  }

  exportarExcel(ventas: any[]) {
    const worksheet = XLSX.utils.json_to_sheet(ventas);
    const workbook = {
      Sheets: { Reporte: worksheet },
      SheetNames: ['Reporte'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `reporte-${new Date().toISOString()}.xlsx`);
  }
}
