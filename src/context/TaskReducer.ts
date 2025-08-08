import type { Task, Filters, TaskAction } from '../types/Task';

export const initialState = {
  tasks: [] as Task[],
  filters: {
    status: 'All',
    priority: 'All',
    category: 'All',
    dueDate: 'All',
    assignedUser: '',
  } as Filters,
};

export function taskReducer(state: typeof initialState, action: TaskAction) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id),
      };
    case 'TOGGLE_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id
            ? {
                ...task,
                status: task.status === 'Completed' ? 'Incomplete' : 'Completed',
              }
            : task
        ),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      };
    default:
      return state;
  }
}