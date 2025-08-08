import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import type { Task } from '../types/Task'
import { Button } from './UI/Button'
import { TaskForm } from './TaskForm'

export default function TaskItem({ task }: { task: Task }) {
  const { dispatch } = useTasks()
  const [isEditing, setIsEditing] = useState(false)

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_STATUS', id: task.id })
  }

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      dispatch({ type: 'DELETE_TASK', id: task.id })
    }
  }



if (isEditing) {
  return (
    <TaskForm 
      task={task}
      onCancel={() => setIsEditing(false)}
    />
  )
}
  return (
    <div className={`p-4 border rounded-lg ${task.status === 'Completed' ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{task.taskName}</h3>
          <div className="flex gap-2 mt-1 text-sm">
            <span className={`px-2 py-1 rounded ${
              task.priority === 'High' ? 'bg-red-100 text-red-800' :
              task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
            <span className="text-gray-600">{task.category}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={handleToggle}
            variant={task.status === 'Completed' ? 'secondary' : 'primary'}
          >
            {task.status === 'Completed' ? 'Incomplete' : 'Complete'}
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        <div>Assigned to: {task.assignedUser}</div>
        {task.dueDate && <div>Due: {task.dueDate}</div>}
      </div>
    </div>
  )
}