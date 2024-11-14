import { Injectable } from '@angular/core';
import type { InvestmentInput } from './investment-input.model';
import { InvestmentResult } from './investment-results/investment-result.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investmentResults!: InvestmentResult[];

  constructor() {}

  calculateInvestmentResults(investmentInputData: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      investmentInputData;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.investmentResults = annualData;
  }

  getInvestmentResults() {
    return this.investmentResults;
  }
}
