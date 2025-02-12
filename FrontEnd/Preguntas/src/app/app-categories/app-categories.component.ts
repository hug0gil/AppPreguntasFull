import { Component, inject } from '@angular/core';
import { AskService } from '../../Services/ask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './app-categories.component.html',
  styleUrl: './app-categories.component.scss',
})
export class AppCategoriesComponent {
  private service = inject(AskService);
  private preguntas: any[] = [];
  private router = inject(Router);

  ngOnInit() {
    this.obtenerPreguntas();
  }

  async obtenerPreguntas() {
    this.service.getPreguntas$().subscribe((preguntas) => {
      this.preguntas = preguntas;
    });
  }

  getPreguntas() {
    return [...this.preguntas];
  }

  getCategorias() {
    const setCategorias = new Set<string>();
    // Agregamos "Todas" primero
    setCategorias.add('Todas');

    // Recorremos las preguntas y extraemos las categorías
    this.getPreguntas().forEach((c) => {
      if (!c.categoria) return; // Evitamos errores si la categoría es null o undefined

      let categoria = c.categoria.toLowerCase(); // Convertimos a minúsculas

      if (categoria === 'culturageneral') {
        setCategorias.add('CulturaGeneral'); // Normalizamos este caso especial
      } else {
        // Capitalizamos la primera letra y agregamos al Set
        let categoriaCapitalizada =
          categoria.charAt(0).toUpperCase() + categoria.slice(1);
        setCategorias.add(categoriaCapitalizada);
      }
    });

    console.log(setCategorias);
    return Array.from(setCategorias); // Convertimos el Set a un Array
  }

  seleccionarCategoria(categoria: string) {
    // Redirige a la ruta de preguntas con la categoría seleccionada
    this.router.navigate(['categorias/' + categoria]);
  }
}
