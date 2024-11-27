import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { agregarCliente, cliente } from '../../../interfaces/cliente';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css',
})
export class AgregarClientesComponent {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public formAgregar: FormGroup = this.formBuild.group({
    nro_doc: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    direccion: ['', Validators.required],
  });

  agregar() {
    if (this.formAgregar.invalid) return;

    const objeto: agregarCliente = {
      nro_doc: this.formAgregar.value.nro_doc,
      nombre: this.formAgregar.value.nombre,
      apellido: this.formAgregar.value.apellido,
      email: this.formAgregar.value.email,
      direccion: this.formAgregar.value.direccion,
    };

    this.clienteService.agregarCliente(objeto).subscribe({
      next: (data) => {
        if (data.message === 'Cliente registrado correctamente') {
          this.router.navigate(['clientes']);
        } else {
          alert('No se pudo registrar');
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  cancelar() {
    this.router.navigate(['clientes']);
  }
}
