import { Routes } from '@angular/router';
import { AppCategoriesComponent } from './app-categories/app-categories.component';
import { AppAskComponent } from './app-ask/app-ask.component';

export const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' }, // Redirige la ruta vacía a /categorias, es la ruta predeterminada
  { path: 'categorias', component: AppCategoriesComponent },
  { path: 'categorias/:categoria', component: AppAskComponent }, // Ahora la ruta incluye /categorias/
  { path: 'categorias/:categoria/:nPreguntas', component: AppAskComponent }, // Ahora la ruta incluye /categorias/

];
