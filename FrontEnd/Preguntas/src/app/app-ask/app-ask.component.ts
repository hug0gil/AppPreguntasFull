import { Component, inject } from '@angular/core';
import { AskService } from '../../Services/ask.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

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
  public categoriaSelec: string = ''; // Para guardar la categoría seleccionada con el boton
  public nPreguntas!: number;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
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
      this.preguntas = (await this.service.getPreguntas()).map((p: any) => ({
        ...p,
        resultMessage: '',
      }));;
    } catch (error) {
      console.error('Error al obtener las preguntas del backend: ' + error);
    }
  }

  async obtenerPreguntasCat(categoria: string) {
    try {
      if (categoria.toLowerCase() === 'todas') {
        this.preguntas = (await this.service.getPreguntas()).map(
          (p: any) => ({
            ...p,
            resultMessage: '', // Inicializa el campo
          })
        );
      } else {
        this.preguntas = (
          await this.service.getPreguntasCategoria(categoria)
        ).map((p: any) => ({
          ...p,
          resultMessage: '',
        }));
      }
    } catch (error) {
      console.error('Error al obtener las preguntas del backend: ' + error);
    }
  }

  verificarRespuesta(pregunta: string, respuestaInput: string) {
    const preguntaConcreta = this.preguntas.find(
      (c) => c.pregunta === pregunta
    );


    if (
      respuestaInput.trim().toLowerCase() ===
      preguntaConcreta.respuestaCorrecta.trim().toLowerCase()
    ) {
      preguntaConcreta.resultMessage = '¡Correcto! Has acertado.';
    } else {
      preguntaConcreta.resultMessage =
        'Incorrecto. La respuesta correcta es: ' +
        preguntaConcreta.respuestaCorrecta;
    }

    this.cdr.detectChanges(); // ⚡ Forzar actualización del DOM
    this.respuesta = '';
  }
}
