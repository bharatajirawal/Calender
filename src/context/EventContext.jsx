import { createContext, useContext, useReducer, useEffect } from 'react'
import { eventReducer, initialState } from './eventReducer'
import { loadEventsFromStorage, saveEventsToStorage } from '../utils/storage'

const EventContext = createContext()
const EventDispatchContext = createContext()

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, initialState, (initial) => ({
    ...initial,
    events: loadEventsFromStorage()
  }))

  useEffect(() => {
    saveEventsToStorage(state.events)
  }, [state.events])

  return (
    <EventContext.Provider value={state}>
      <EventDispatchContext.Provider value={dispatch}>
        {children}
      </EventDispatchContext.Provider>
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error('useEvents must be used within EventProvider')
  }
  return context
}

export function useEventDispatch() {
  const context = useContext(EventDispatchContext)
  if (!context) {
    throw new Error('useEventDispatch must be used within EventProvider')
  }
  return context
}