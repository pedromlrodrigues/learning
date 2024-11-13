import { Component, Input } from '@angular/core';
import { User } from '../user/user.model';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskComponent } from './task/task.component';
import { NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, CreateTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) selectedUser?: User;
  isAddingTask = false;

  constructor(private tasksService: TasksService) {}

  get userTasks() {
    return this.tasksService.getUserTasks(this.selectedUser!.id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(task: NewTaskData) {
    this.tasksService.addTask(task, this.selectedUser!.id);
    this.isAddingTask = false;
  }
}
