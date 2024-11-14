import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FormComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {}
}
