import { Component, Input } from '@angular/core';
import { DUMMY_TASKS } from '../data/dummy-tasks';
import { User } from '../user/user.model';
import { NewTaskData, Task } from './task/task.model';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
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

  onCompleteTask(taskId: string) {
    this.tasksService.completeTask(taskId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(task: NewTaskData) {
    this.tasksService.addTask(task, this.selectedUser!.id);
    this.isAddingTask = false;
  }
}
