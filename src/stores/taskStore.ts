import { makeAutoObservable } from 'mobx';
import { Task } from '../models/Task';

class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(id: number, updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) this.tasks[index] = updatedTask;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  selectTask(id: number) {
    this.selectedTask = this.tasks.find(task => task.id === id) || null;
  }
}

const taskStore = new TaskStore();
export default taskStore;

