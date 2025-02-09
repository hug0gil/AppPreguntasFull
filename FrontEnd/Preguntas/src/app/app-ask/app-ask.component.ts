import { Component, inject } from '@angular/core';
import { AskService } from '../../Services/ask.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-ask.component.html',
  styleUrl: './app-ask.component.scss',
})
export class AppAskComponent {
  private preguntas: any[] = [];
  private service = inject(AskService);
  public respuesta: string = '';
  public resultMessage: string = '';
  public categoriaSelec: string = ''; // Para guardar la categoría seleccionada con el boton
  public nPreguntas!: number;
  private route = inject(ActivatedRoute); // Inyectamos ActivatedRoute para acceder a los parámetros de la ruta dinámicamente

  ngOnInit() {
    this.route.params.subscribe((params) => {
        this.categoriaSelec = params['categoria']; 
        this.nPreguntas = params['nPreguntas']; 
        if (isNaN(this.nPreguntas) || this.nPreguntas === 0) {
            this.obtenerPreguntasCat(this.categoriaSelec);
        } else {
            console.log('entra en npreguntas');
            console.log('NPreguntas = ' + this.nPreguntas);
            this.obtenerPreguntasCatnPreg(this.categoriaSelec, this.nPreguntas);
        }
    });
}

  async obtenerPreguntasCatnPreg(categoria: string, nPreguntas: number) {
    try {
      this.preguntas = await this.service.getPreguntasCategoriaNumeroP(
        categoria,
        nPreguntas
      );
    } catch (error) {
      console.error('Error al obtener las preguntas del backend: ' + error);
    }
  }

  getPreguntas() {
    return [...this.preguntas];
  }

  async obtenerPreguntas() {
    try {
      this.preguntas = await this.service.getPreguntas();
    } catch (error) {
      console.error('Error al obtener las preguntas del backend: ' + error);
    }
  }

  async obtenerPreguntasCat(categoria: string) {
    try {
      if (categoria.toLowerCase() === 'todas')
        this.preguntas = await this.service.getPreguntas();
      else this.preguntas = await this.service.getPreguntasCategoria(categoria);
    } catch (error) {
      console.error('Error al obtener las preguntas del backend: ' + error);
    }
  }

  verificarRespuesta(pregunta: string, respuestaInput: string) {
    // Encuentra la pregunta concreta
    const preguntaConcreta = this.preguntas.find(
      (c) => c.pregunta === pregunta
    );

    // Valida que la pregunta concreta exista
    if (!preguntaConcreta) {
      console.error('Error: Pregunta no encontrada.');
      return;
    }

    // Verifica la respuesta del usuario y actualiza el mensaje de la pregunta
    if (
      respuestaInput.trim().toLowerCase() ===
      preguntaConcreta.respuestaCorrecta.toLowerCase()
    ) {
      preguntaConcreta.resultMessage = '¡Correcto! Has acertado.';
    } else {
      preguntaConcreta.resultMessage =
        'Incorrecto. La respuesta correcta es: ' +
        preguntaConcreta.respuestaCorrecta;
    }

    this.respuesta = '';
  }
}
