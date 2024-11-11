import {
  Component,
  computed,
  EventEmitter,
  input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // @Input({ required: true }) name!: string;
  // @Input({ required: true }) avatar!: string;
  id = input.required<string>();
  avatar = input.required<string>();
  name = input.required<string>();

  // @Output() select = new EventEmitter();
  select = output<string>();

  imagePath = computed(() => {
    return 'assets/users/' + this.avatar();
  });

  // get imagePath() {
  //   return '/assets/users/' + this.avatar;
  // }

  onSelectUser() {
    this.select.emit(this.id());
  }
}
