import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { login } from '../../interfaces/login';
// Angular Material
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const objeto: login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        if (data.message === 'Success') {
          localStorage.setItem('access_token', data.access_token);
          this.router.navigate(['inicio']);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          // Si el error es 401 Unauthorized, mostrar alerta
          alert('Credenciales Incorrectas. Verifique sus credenciales');
        } else {
          // Otros errores
          alert('Ocurrió un error inesperado. Por favor intente nuevamente.');
          console.log(error.message);
        }
      },
    });
  }

  registrarse() {
    this.router.navigate(['register']);
  }
}
