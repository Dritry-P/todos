import React, { useState } from 'react';
import taskStore from '../stores/taskStore';
import { Task } from '../models/Task';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    taskStore.addTask({
      id: Date.now(),
      title,
      description,
      status: 'pending',
      file,
    });
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: 'pending',
      file,
    };

    taskStore.addTaskOnServe(newTask)

    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control mt-2"
      />
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setFile(files[0]);
          }
        }}
        className="form-control mt-2"
      />
      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
