import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { categoria } from '../../interfaces/categoria';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TableComponent, MatPaginator],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  private categoriaService = inject(CategoriaService);
  public listaCategoria: categoria[] = [];
  public pagedCategoria: categoria[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() {
    this.categoriaService.lista().subscribe({
      next: (data) => {
        if (data.value.length > 0) {
          this.listaCategoria = data.value;
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
    this.pagedCategoria = this.listaCategoria.slice(startIndex, endIndex);
  }
}
