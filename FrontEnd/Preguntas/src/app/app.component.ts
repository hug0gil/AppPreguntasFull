import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa los componentes que se usarán en las rutas
  templateUrl: './app.component.html', // Apunta al archivo HTML donde está el router-outlet
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Este componente no necesita lógica adicional en este caso
}