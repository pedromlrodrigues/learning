import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { InvestmentService } from './investment.service';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { InvestmentResult } from './investment-results/investment-result.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FormComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  investmentsResults!: InvestmentResult[];

  constructor(private investmentService: InvestmentService) {}

  calculateInvestmentResults(investmentInputData: InvestmentInput) {
    this.investmentsResults =
      this.investmentService.calculateInvestmentResults(investmentInputData);
  }
}
