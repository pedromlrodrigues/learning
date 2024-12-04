import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketItemComponent } from './ticket-item/ticket-item.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketItemComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAddTicket(newTicket: { title: string; text: string }) {
    const ticket: Ticket = {
      title: newTicket.title,
      request: newTicket.text,
      id: Math.random().toString(),
      status: 'open',
    };

    this.tickets.push(ticket);
  }
}
