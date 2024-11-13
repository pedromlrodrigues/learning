import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { InvestmentService } from './investment.service';
import { InvestmentInput } from './investment-input.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FormComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private investmentService: InvestmentService) {}

  calculateInvestmentResults(investmentInputData: InvestmentInput) {
    const investmentResults =
      this.investmentService.calculateInvestmentResults(investmentInputData);
    console.log(investmentResults);
  }
}
