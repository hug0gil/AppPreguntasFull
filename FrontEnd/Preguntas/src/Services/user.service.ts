import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import axios from 'axios'; // Importamos axios
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://127.0.0.1:3000/'; // URL base de petición del BackEnd

  // Creamos el BehaviorSubject para los usuarios
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  constructor() {
    this.getUsers();
  }

  getUsers() {
    try {
      from(axios.get(this.url + 'users')).subscribe((res) => {
        this.usersSubject.next(res.data);
      });
    } catch (e) {
      console.log(
        'Error a la hora de la obtención de usuarios mediante observables: ' + e
      );
    }
  }

  getUsers$(): Observable<User[]> {
    return this.usersSubject.asObservable(); // Exponemos solo el observable
  }
}
