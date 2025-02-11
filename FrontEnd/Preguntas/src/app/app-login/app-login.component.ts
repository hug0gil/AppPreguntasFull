import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss',
})
export class AppLoginComponent {
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
      this.router.navigate(["/categorias"])
    } 
  }
}
