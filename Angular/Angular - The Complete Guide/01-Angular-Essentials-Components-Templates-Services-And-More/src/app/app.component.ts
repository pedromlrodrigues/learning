import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

import { DUMMY_USERS } from './data/dummy-users';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUser?: User;

  onSelectUser(id: string) {
    console.log('Selected user with id ' + id);
    this.selectedUser = this.users.find(u => u.id === id);
  }
}
