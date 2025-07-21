import { generateRecurringEvents, checkEventConflict } from '../utils/eventUtils'
import toast from 'react-hot-toast'

export const initialState = {
  events: [],
  selectedDate: new Date(),
  currentMonth: new Date(),
  modalOpen: false,
  editingEvent: null,
  draggedEvent: null,
  searchTerm: '',
  selectedCategory: 'all'
}

export function eventReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT': {
      const newEvent = {
        ...action.event,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
      
      // Check for conflicts
      const hasConflict = checkEventConflict(newEvent, state.events)
      if (hasConflict) {
        toast.error('Event conflicts with existing event at the same time!')
        return state
      }
      
      const eventsToAdd = newEvent.recurrence.type !== 'none' 
        ? generateRecurringEvents(newEvent)
        : [newEvent]
      
      toast.success(`Event "${newEvent.title}" created successfully!`)
      
      return {
        ...state,
        events: [...state.events, ...eventsToAdd],
        modalOpen: false,
        editingEvent: null
      }
    }
    
    case 'UPDATE_EVENT': {
      // Check for conflicts when updating
      const hasConflict = checkEventConflict(action.event, state.events)
      if (hasConflict) {
        toast.error('Event conflicts with existing event at the same time!')
        return state
      }

      const updatedEvents = state.events.map(event =>
        event.id === action.event.id ? action.event : event
      )
      
      toast.success(`Event "${action.event.title}" updated successfully!`)
      
      return {
        ...state,
        events: updatedEvents,
        modalOpen: false,
        editingEvent: null
      }
    }
    
    case 'DELETE_EVENT': {
      const deletedEvent = state.events.find(event => event.id === action.eventId)
      
      toast.success(`Event "${deletedEvent?.title}" deleted successfully!`)
      
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.eventId)
      }
    }
    
    case 'SET_SELECTED_DATE': {
      return {
        ...state,
        selectedDate: action.date
      }
    }
    
    case 'SET_CURRENT_MONTH': {
      return {
        ...state,
        currentMonth: action.month
      }
    }
    
    case 'OPEN_MODAL': {
      return {
        ...state,
        modalOpen: true,
        editingEvent: action.event || null
      }
    }
    
    case 'CLOSE_MODAL': {
      return {
        ...state,
        modalOpen: false,
        editingEvent: null
      }
    }
    
    case 'SET_DRAGGED_EVENT': {
      return {
        ...state,
        draggedEvent: action.event
      }
    }
    
    case 'MOVE_EVENT': {
      const movedEvent = state.events.find(event => event.id === action.eventId)
      
      // Check for conflicts when moving
      const testEvent = { ...movedEvent, date: action.newDate }
      const hasConflict = checkEventConflict(testEvent, state.events)
      
      if (hasConflict) {
        toast.error('Cannot move event - conflicts with existing event!')
        return { ...state, draggedEvent: null }
      }

      const updatedEvents = state.events.map(event =>
        event.id === action.eventId 
          ? { ...event, date: action.newDate }
          : event
      )
      
      toast.success(`Event "${movedEvent?.title}" moved successfully!`)
      
      return {
        ...state,
        events: updatedEvents,
        draggedEvent: null
      }
    }
    
    case 'SET_SEARCH_TERM': {
      return {
        ...state,
        searchTerm: action.term
      }
    }
    
    case 'SET_SELECTED_CATEGORY': {
      return {
        ...state,
        selectedCategory: action.category
      }
    }
    
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
