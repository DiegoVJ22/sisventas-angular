import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { user } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public formRegister: FormGroup = this.formBuild.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  registrarse() {
    if (this.formRegister.invalid) return;

    const objeto: user = {
      name: this.formRegister.value.email,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
    };

    this.accesoService.registrarse(objeto).subscribe({
      next: (data) => {
        if (data.message === 'Success') {
          this.router.navigate(['']);
        } else {
          alert('No se pudo registrar');
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  volver() {
    this.router.navigate(['']);
  }
}
