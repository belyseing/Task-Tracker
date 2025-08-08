import { useTasks } from '../context/TaskContext'
import { Select } from './UI/Select'
import { Button } from './UI/Button'
import type { Status, Priority, DueDateFilter, Category } from '../types/Task'

export default function Filters() {
  const { state, dispatch } = useTasks()

  const filterOptions = {
    status: [
      { value: 'All' as const, label: 'All Status' },
      { value: 'Completed' as const, label: 'Completed' },
      { value: 'Incomplete' as const, label: 'Incomplete' }
    ],
    priority: [
      { value: 'All' as const, label: 'All Priority' },
      { value: 'High' as const, label: 'High' },
      { value: 'Medium' as const, label: 'Medium' },
      { value: 'Low' as const, label: 'Low' }
    ],
    category: [
      { value: 'All' as const, label: 'All Categories' },
      { value: 'Frontend' as const, label: 'Frontend' },
      { value: 'Backend' as const, label: 'Backend' },
      { value: 'Meeting' as const, label: 'Meeting' },
      { value: 'Design' as const, label: 'Design' }
    ],
    dueDate: [
      { value: 'All' as const, label: 'All Due Dates' },
      { value: 'Overdue' as const, label: 'Overdue' },
      { value: 'Today' as const, label: 'Today' },
      { value: 'Upcoming' as const, label: 'Upcoming' },
      { value: 'No Due Date' as const, label: 'No Due Date' }
    ]
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <Select
          label="Status"
          options={filterOptions.status}
          value={state.filters.status}
          onChange={value => dispatch({ 
            type: 'SET_FILTERS', 
            payload: { status: value as Status | 'All' } 
          })}
        />
        
        <Select
          label="Priority"
          options={filterOptions.priority}
          value={state.filters.priority}
          onChange={value => dispatch({ 
            type: 'SET_FILTERS', 
            payload: { priority: value as Priority | 'All' } 
          })}
        />
        
        <Select
          label="Category"
          options={filterOptions.category}
          value={state.filters.category}
          onChange={value => dispatch({ 
            type: 'SET_FILTERS', 
            payload: { category: value as Category | 'All' } 
          })}
        />
        
        <Select
          label="Due Date"
          options={filterOptions.dueDate}
          value={state.filters.dueDate}
          onChange={value => dispatch({ 
            type: 'SET_FILTERS', 
            payload: { dueDate: value as DueDateFilter | 'All' } 
          })}
        />
        
        <div className="flex items-end">
          <Button 
            variant="secondary" 
            onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}