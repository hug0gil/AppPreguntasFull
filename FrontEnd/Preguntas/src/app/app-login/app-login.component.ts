import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss',
})
export class AppLoginComponent {
  private service = inject(UserService);
  private users: User[] = [];

  // Para tener los usuarios desde que iniciamos la app y que la app reaccione a cada cambio que se realice
  // nos subscribimos al subject
  ngOnInit() {
    this.service
      .getUsers$()
      .subscribe((usersSubject) => (this.users = usersSubject));
  }

  form: FormGroup;
  private router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('.*[0-9].*'),
      ]),
    });
  }

  isValid(): void {
    if (this.form.valid) {
      console.log('true');
      this.router.navigate(['/categorias']);
    }
  }
}
