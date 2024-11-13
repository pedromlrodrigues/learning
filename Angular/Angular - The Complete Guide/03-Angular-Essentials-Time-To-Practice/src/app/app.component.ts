import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FormComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
