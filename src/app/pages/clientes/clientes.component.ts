import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ClienteService } from '../../services/cliente.service';
import { cliente } from '../../interfaces/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  private clienteService = inject(ClienteService);
  public listaCliente: cliente[] = [];
  constructor() {
    this.clienteService.lista().subscribe({
      next: (data) => {
        if (data.value.length > 0) {
          this.listaCliente = data.value;
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
}
