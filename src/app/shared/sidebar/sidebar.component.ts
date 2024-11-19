import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private router = inject(Router);
  inicio() {
    this.router.navigate(['inicio']);
  }
  clientes() {
    this.router.navigate(['clientes']);
  }
  categorias() {
    this.router.navigate(['categorias']);
  }
  unidades() {
    this.router.navigate(['unidades']);
  }
  productos() {
    this.router.navigate(['productos']);
  }
}
