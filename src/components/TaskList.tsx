import { useTasks } from '../context/TaskContext'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { filteredTasks } = useTasks()

  return (
    <div className="space-y-3">
      {filteredTasks.length === 0 ? (
        <p className="text-center py-4 text-gray-500">No tasks found</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  )
}