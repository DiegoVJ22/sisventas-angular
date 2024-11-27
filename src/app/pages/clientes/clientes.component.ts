import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ClienteService } from '../../services/cliente.service';
import { cliente } from '../../interfaces/cliente';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TableComponent,
    MatPaginator,
    FormsModule,
    SidebarComponent,
    TableComponent,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  public listaCliente: cliente[] = [];
  public pagedCliente: cliente[] = [];
  public searchTerm: string = ''; // Almacena el término de búsqueda

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() {
    this.obtenerClientes();
  }

  ngAfterViewInit() {
    // Nos suscribimos al evento de cambio de página
    this.paginator.page.subscribe((event) => this.onPageChange(event));
  }

  // Obtener clientes con o sin búsqueda
  obtenerClientes(search?: string) {
    this.clienteService.lista(search).subscribe({
      next: (data) => {
        this.listaCliente = data.value;
        this.setPagedData(0, this.paginator?.pageSize || 5);
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error.message);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.setPagedData(event.pageIndex, event.pageSize);
  }

  setPagedData(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.pagedCliente = this.listaCliente.slice(startIndex, endIndex);
  }

  // Método llamado al escribir en el buscador
  onInputChange(searchTerm: string) {
    this.obtenerClientes(searchTerm);
  }

  // Método para buscar al presionar el botón
  buscarClientes(searchTerm: string) {
    this.obtenerClientes(searchTerm);
  }

  agregar() {
    this.router.navigate(['clientes/agregar']);
  }
}
