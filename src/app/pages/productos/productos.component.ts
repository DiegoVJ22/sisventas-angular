import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { producto } from '../../interfaces/producto';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TableComponent, MatPaginator],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  private productoService = inject(ProductoService);
  public listaProducto: producto[] = [];
  public pagedProducto: producto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() {
    this.productoService.lista().subscribe({
      next: (data) => {
        if (data.value.length > 0) {
          this.listaProducto = data.value;
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
    this.pagedProducto = this.listaProducto.slice(startIndex, endIndex);
  }
}
