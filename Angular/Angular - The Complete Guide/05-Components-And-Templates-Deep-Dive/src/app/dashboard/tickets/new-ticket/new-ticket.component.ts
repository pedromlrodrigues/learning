import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  imports: [FormsModule, ButtonComponent, ControlComponent],
})
export class NewTicketComponent {
  onSubmit(titleElement: string, requestElement: string) {
    console.log(titleElement, requestElement);
  }
}
