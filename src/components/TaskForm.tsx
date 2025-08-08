import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import type { Task, Priority, Category } from '../types/Task';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { Select } from './UI/Select';

const priorityOptions: { value: Priority; label: string }[] = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Design', label: 'Design' },
];

type TaskFormProps = {
  task?: Task;
  onCancel?: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ task, onCancel }) => {
  const { dispatch } = useTasks();
  const isEditing = !!task;

  const [formData, setFormData] = useState<Task>(
    task || {
      id: '',
      taskName: '',
      priority: 'Medium',
      category: 'Frontend',
      dueDate: null,
      assignedUser: '',
      assignedOn: new Date().toISOString().split('T')[0],
      status: 'Incomplete',
    }
  );

  const handleChange = (field: keyof Task, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskToSubmit = {
      ...formData,
      id: isEditing ? formData.id : Date.now().toString(),
    };

    if (isEditing) {
      dispatch({ type: 'EDIT_TASK', payload: taskToSubmit });
    } else {
      dispatch({ type: 'ADD_TASK', payload: taskToSubmit });
    }

    if (!isEditing) {
      setFormData({
        id: '',
        taskName: '',
        priority: 'Medium',
        category: 'Frontend',
        dueDate: null,
        assignedUser: '',
        assignedOn: new Date().toISOString().split('T')[0],
        status: 'Incomplete',
      });
    }

    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">
        {isEditing ? 'Edit Task' : 'Add New Task'}
      </h2>

      <Input
        label="Task Name"
        value={formData.taskName}
        onChange={value => handleChange('taskName', value)}
        placeholder="Enter task name"
        
      />

      <Select
        label="Priority"
        options={priorityOptions}
        value={formData.priority}
        onChange={value => handleChange('priority', value as Priority)}
      />

      <Select
        label="Category"
        options={categoryOptions}
        value={formData.category}
        onChange={value => handleChange('category', value as Category)}
      />

      <Input
        label="Due Date"
        type="date"
        value={formData.dueDate || ''}
        onChange={value => handleChange('dueDate', value || null)}
      />

      <Input
        label="Assigned To"
        value={formData.assignedUser}
        onChange={value => handleChange('assignedUser', value)}
        placeholder="Enter team member name"
        
      />

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="mr-2"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};