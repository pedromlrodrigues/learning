import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksServiceToken } from '../../../../main';
import {
  Task,
  TASK_STATUS_OPTIONS,
  TaskStatus,
  taskStatusOptionsProvider,
} from '../../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [taskStatusOptionsProvider],
})
export class TaskItemComponent {
  task = input.required<Task>();
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  private tasksService = inject(TasksServiceToken);

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
