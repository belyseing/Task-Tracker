import { TaskProvider } from './context/TaskContext'
import { TaskForm } from './components/TaskForm'
import Filters from './components/Filters'
import TaskList from './components/TaskList'

function App() {
  return (
    <TaskProvider>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Team Task Tracker</h1>
        
       
        <div className="mb-8">
          <TaskForm />
        </div>
        
        <div className="mb-6">
          <Filters />
        </div>
        
      
        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default App