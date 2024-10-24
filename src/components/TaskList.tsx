import React from 'react';
import taskStore from '../stores/taskStore';
import TaskItem from './TaskItem';
import { observer } from 'mobx-react-lite';

const TaskList: React.FC = () => {
  return (
    <div className="task-list">
      {taskStore.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default observer(TaskList);
