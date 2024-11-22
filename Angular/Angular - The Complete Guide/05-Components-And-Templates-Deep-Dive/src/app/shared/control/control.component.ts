import {
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()', // recommended over using @HostListener()
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; only used for backwards compatibility
  // @HostListener('click') onClick() {
  //   console.log('Clicked!');
  // }
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;
  private control =
    contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(
      'input'
    );
  label = input.required<string>();
  private el = inject(ElementRef);

  onClick() {
    console.log(this.el);
    console.log(this.control());
  }
}
