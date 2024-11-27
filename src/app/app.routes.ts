import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { UnidadesComponent } from './pages/unidades/unidades.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { authGuard } from './custom/auth.guard';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AgregarClientesComponent } from './pages/clientes/agregar-clientes/agregar-clientes.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
  {
    path: 'clientes/agregar',
    component: AgregarClientesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [authGuard],
  },
  { path: 'unidades', component: UnidadesComponent, canActivate: [authGuard] },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard],
  },
];
