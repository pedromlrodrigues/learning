import { Injectable } from '@angular/core';
import { NewTaskData, Task } from './task/task.model';
import { DUMMY_TASKS } from '../data/dummy-tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = DUMMY_TASKS;
  constructor() {}

  getUserTasks(userId: string) {
    return this.tasks.filter(t => t.userId === userId);
  }

  addTask(task: NewTaskData, userId: string) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      userId: userId,
      title: task.title,
      summary: task.summary,
      dueDate: task.date,
    });
  }

  completeTask(taskId: string) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }
}
