import { Component, Input } from '@angular/core';
import { DUMMY_TASKS } from '../data/dummy-tasks';
import { User } from '../user/user.model';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) selectedUser?: User;

  tasks: Task[] = DUMMY_TASKS;

  get userTasks() {
    return this.tasks.filter(t => t.userId === this.selectedUser?.id);
  }
}
