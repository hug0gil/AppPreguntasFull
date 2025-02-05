import { Component, inject, Inject } from '@angular/core';
import { AppAskComponent } from "./app-ask/app-ask.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppAskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
 
}
