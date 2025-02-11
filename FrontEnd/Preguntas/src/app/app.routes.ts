import { Routes } from '@angular/router';
import { AppCategoriesComponent } from './app-categories/app-categories.component';
import { AppAskComponent } from './app-ask/app-ask.component';
import { AppLoginComponent } from './app-login/app-login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige la ruta vacía a /categorias, es la ruta predeterminada
  { path: 'login', component: AppLoginComponent },
  { path: 'categorias', component: AppCategoriesComponent },
  { path: 'categorias/:categoria', component: AppAskComponent }, // Ahora la ruta incluye /categorias/
  { path: 'categorias/:categoria/:nPreguntas', component: AppAskComponent }, // Ahora la ruta incluye /categorias/
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Captura rutas inexistentes y redirige a /login
];
