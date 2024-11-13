import { Component, Input } from '@angular/core';
import { DUMMY_TASKS } from '../data/dummy-tasks';
import { User } from '../user/user.model';
import { NewTaskData, Task } from './task/task.model';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';

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

  tasks: Task[] = DUMMY_TASKS;

  get userTasks() {
    return this.tasks.filter(t => t.userId === this.selectedUser?.id);
  }

  onCompleteTask(taskId: string) {
    console.log(taskId);
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(task: NewTaskData) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: this.selectedUser!.id,
      title: task.title,
      summary: task.summary,
      dueDate: task.date,
    });

    this.isAddingTask = false;
  }
}
