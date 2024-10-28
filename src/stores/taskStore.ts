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

  async addTaskOnServe(task: Task) {
  const formData = new FormData();
    formData.append('title', task.title);
    formData.append('description', task.description);
    formData.append('status', task.status);

  if (task.file) {
    formData.append('file', task.file);
  }

  try {
    console.log("Запит відправлено...");

    const response = await fetch('http://localhost:5000/task', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Статус: ${response.status} - ${response.statusText}`);
    }

    console.log("Запит оброблено успішно.");
    return await response.json();
    
  } catch (error: any) {
    console.error("Запит відхилено, помилка:", error.message);
    throw error;
  }
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

