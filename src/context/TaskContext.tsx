import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Dispatch } from 'react';
import { taskReducer, initialState } from './TaskReducer';
import type { TaskAction, Task } from '../types/Task';


const savedTasks = localStorage.getItem('tasks');
const initialTasks = savedTasks ? JSON.parse(savedTasks) : initialState.tasks;

type TaskContextType = {
  state: typeof initialState;
  dispatch: Dispatch<TaskAction>;
  filteredTasks: Task[];
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, { 
    ...initialState, 
    tasks: initialTasks 
  });


  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [state.tasks]);

  const filterTasks = (): Task[] => {
    const today = new Date().toISOString().split('T')[0];

    return state.tasks.filter((task: Task) => {
      
      if (
        state.filters.status !== 'All' &&
        task.status !== state.filters.status
      ) {
        return false;
      }

    
      if (
        state.filters.priority !== 'All' &&
        task.priority !== state.filters.priority
      ) {
        return false;
      }

     
      if (
        state.filters.category !== 'All' &&
        task.category !== state.filters.category
      ) {
        return false;
      }

   
      if (state.filters.dueDate !== 'All') {
        if (!task.dueDate && state.filters.dueDate !== 'No Due Date') {
          return false;
        }

        if (task.dueDate) {
          const dueDate = task.dueDate;
          switch (state.filters.dueDate) {
            case 'Overdue':
              if (dueDate >= today) return false;
              break;
            case 'Today':
              if (dueDate !== today) return false;
              break;
            case 'Upcoming':
              if (dueDate <= today) return false;
              break;
            case 'No Due Date':
              return false;
          }
        }
      }

    
      if (
        state.filters.assignedUser &&
        !task.assignedUser
          .toLowerCase()
          .includes(state.filters.assignedUser.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredTasks = filterTasks();

  return (
    <TaskContext.Provider value={{ state, dispatch, filteredTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};