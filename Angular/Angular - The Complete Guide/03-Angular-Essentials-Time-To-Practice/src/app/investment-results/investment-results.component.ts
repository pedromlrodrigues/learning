import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  constructor(private investmentService: InvestmentService) {}

  get investmentResults() {
    return this.investmentService.getInvestmentResults();
  }
}
