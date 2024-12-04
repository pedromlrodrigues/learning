import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
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
export class NewTicketComponent implements AfterViewInit, OnInit {
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  addTicket = output<{ title: string; text: string }>();

  ngOnInit() {
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
    console.log(this.form().nativeElement);
  }

  onSubmit(title: string, ticketText: string) {
    this.addTicket.emit({ title: title, text: ticketText });
    this.form().nativeElement.reset();
  }
}
