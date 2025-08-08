export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Completed' | 'Incomplete';
export type DueDateFilter = 'Overdue' | 'Today' | 'Upcoming' | 'No Due Date';
export type Category = 'Frontend' | 'Backend' | 'Meeting' | 'Design' | string;

export interface Task {
  id: string;
  taskName: string;
  priority: Priority;
  category: Category;
  dueDate: string | null;
  assignedUser: string;
  assignedOn: string;
  status: Status;
}

export interface Filters {
  status: Status | 'All';
  priority: Priority | 'All';
  category: Category | 'All';
  dueDate: DueDateFilter | 'All';
  assignedUser: string;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'TOGGLE_STATUS'; id: string }
  | { type: 'SET_FILTERS'; payload: Partial<Filters> }
  | { type: 'CLEAR_FILTERS' };