import { Component, inject } from '@angular/core';
import { AskService } from '../../Services/ask.service';
import { CommonModule } from '@angular/common';

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
  public visible = false;
  public respuesta: string = '';
  public resultMessage: string = '';

  isHidden() {
    this.visible = !this.visible;
  }

  ngOnInit() {
    this.obtenerPreguntas();
  }

  getPreguntas() {
    return [...this.preguntas];
  }

  async obtenerPreguntas() {
    try {
      this.preguntas = await this.service.getPreguntas();
      this.respuesta = ''
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