import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [],
  templateUrl: './ticket-item.component.html',
  styleUrl: './ticket-item.component.css',
})
export class TicketItemComponent {
  data = input.required<Ticket>();
  close = output<string>();
  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update(wasVisible => !wasVisible);
  }
}
