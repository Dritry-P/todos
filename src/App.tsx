import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="my-4">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
