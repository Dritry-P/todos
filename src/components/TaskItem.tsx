import React, { useState } from 'react';
import { Task } from '../models/Task';
import taskStore from '../stores/taskStore';
import { observer } from 'mobx-react-lite';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    taskStore.updateTask(task.id, {
      ...task,
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const handleStatusChange = () => {
    taskStore.updateTask(task.id, {
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed',
    });
  };

  return (
    <div className="task-item card mb-3">
      <div className="card-header" onClick={toggleExpand}>
        <h5>{task.title}</h5>
        <span>
          {task.status === 'completed' ? '✔️' : '❌'}
        </span>
      </div>
      {isExpanded && (
        <div className="card-body">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="form-control mb-2"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="form-control mb-2"
              />
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <p>{task.description}</p>
              {task.file && (
                <p>
                  <a href={URL.createObjectURL(task.file)} download={task.file.name}>
                    Download attached file
                  </a>
                </p>
              )}
              <button className="btn btn-secondary mr-2" onClick={toggleEdit}>
                Edit Task
              </button>
              <button
                className={`btn ${task.status === 'completed' ? 'btn-warning' : 'btn-success'}`}
                onClick={handleStatusChange}
              >
                {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(TaskItem);
