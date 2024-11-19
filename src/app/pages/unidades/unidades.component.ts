import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { UnidadService } from '../../services/unidad.service';
import { unidad } from '../../interfaces/unidad';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TableComponent, MatPaginator],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.css',
})
export class UnidadesComponent {
  private unidadService = inject(UnidadService);
  public listaUnidad: unidad[] = [];
  public pagedUnidad: unidad[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() {
    this.unidadService.lista().subscribe({
      next: (data) => {
        if (data.value.length > 0) {
          this.listaUnidad = data.value;
          // Inicializamos los datos paginados
          this.setPagedData(0, this.paginator?.pageSize || 10);
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  ngAfterViewInit() {
    // Nos suscribimos al evento de cambio de página
    this.paginator.page.subscribe((event) => this.onPageChange(event));
  }

  onPageChange(event: PageEvent) {
    this.setPagedData(event.pageIndex, event.pageSize);
  }

  setPagedData(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.pagedUnidad = this.listaUnidad.slice(startIndex, endIndex);
  }
}
