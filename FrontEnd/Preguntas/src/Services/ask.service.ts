import { Injectable } from '@angular/core';
import axios from 'axios'; //Importamos axios aparte de hacer el npm install del mismo

@Injectable({
  providedIn: 'root',
})
export class AskService {
  private url = 'http://127.0.0.1:3000/preguntas'; // URL de petición del BackEnd

  constructor() {}

  async getPreguntas(){
    try {
      const res = await axios.get(this.url) // Realiza la solicitud GET
      return res.data // Devolvemos los datos que nos dan al hacer el GET
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);  
      throw error;
    }
  }
}
