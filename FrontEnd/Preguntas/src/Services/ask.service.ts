import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import { Pregunta } from '../models/pregunta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AskService {
  private url = 'http://127.0.0.1:3000/'; // URL base de petición del BackEnd

  private http = inject(HttpClient);

  private preguntasSubject: BehaviorSubject<Pregunta[]> = new BehaviorSubject<
    Pregunta[]
  >([]);

  constructor() {
    // Podrías inicializar la carga de preguntas si se desea que siempre esté disponible al inyectarse
    this.getPreguntas();
  }

  // Función que obtiene todas las preguntas
  getPreguntas() {
    try {
      this.http
        .get<Pregunta[]>(this.url + 'categorias')
        .subscribe((res) => this.preguntasSubject.next(res));
    } catch (e) {
      console.log(
        'Error a la hora de la obtención de preguntas con limite y categoria concreta mediante observables: ' +
          e
      );
    }
  }

  // Función que obtiene preguntas por categoría
  getPreguntasCategoria(categoria: string) {
    try {
      this.http
        .get<Pregunta[]>(this.url + 'categorias' + '/' + categoria)
        .subscribe((res) => this.preguntasSubject.next(res));
    } catch (e) {
      console.log(
        'Error a la hora de la obtención de preguntas con limite y categoria concreta mediante observables: ' +
          e
      );
    }
  }

  // Función que obtiene un número específico de preguntas por categoría
  getPreguntasCategoriaNumeroP(categoria: string, nPreguntas: number) {
    try {
      this.http
        .get<Pregunta[]>(
          this.url + 'categorias' + '/' + categoria + '/' + nPreguntas
        )
        .subscribe((res) => this.preguntasSubject.next(res));
    } catch (e) {
      console.log(
        'Error a la hora de la obtención de preguntas con limite y categoria concreta mediante observables: ' +
          e
      );
    }
  }

  // Método para obtener el Observable de preguntas
  getPreguntas$() {
    return this.preguntasSubject.asObservable();
  }
}

// async getPreguntas() {
//   try {
//     const res = await axios.get(this.url+"categorias"); // Realiza la solicitud GET
//     return res.data; // Devolvemos los datos que nos dan al hacer el GET
//   } catch (error) {
//     console.error('Error al obtener las preguntas:', error);
//     throw error;
//   }
// }
