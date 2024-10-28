import { Task } from "../models/Task";

export const addTaskReq = async (task: Task) => {
  const formData = new FormData();
  formData.append('title', task.title);
  formData.append('description', task.description);
  formData.append('status', task.status);

  if (task.file) {
    formData.append('file', task.file); 
  }

  const response = await fetch('http://localhost:5000/task', {
    method: 'POST',
    body: formData,
  });
  return response.json();
};