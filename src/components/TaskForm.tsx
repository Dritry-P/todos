import React, { useState } from 'react';
import taskStore from '../stores/taskStore';

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
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="form-control mt-2"
      />
      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
