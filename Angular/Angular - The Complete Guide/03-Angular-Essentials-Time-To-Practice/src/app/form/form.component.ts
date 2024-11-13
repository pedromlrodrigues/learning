import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  enteredInitialInvestment: string = '';
  enteredAnnualInvestment: string = '';
  enteredExpectedReturn: string = '';
  enteredDuration: string = '';

  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    console.log(
      this.investmentService.calculateInvestmentResults(
        +this.enteredInitialInvestment,
        +this.enteredAnnualInvestment,
        +this.enteredExpectedReturn,
        +this.enteredDuration
      )
    );
  }
}
