import toast from 'react-hot-toast'

const STORAGE_KEY = 'calendar-events'

export function loadEventsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const events = stored ? JSON.parse(stored) : []
    
    if (events.length > 0) {
      toast.success(`Loaded ${events.length} events from storage`)
    }
    
    return events
  } catch (error) {
    console.error('Error loading events from storage:', error)
    toast.error('Failed to load saved events')
    return []
  }
}

export function saveEventsToStorage(events) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch (error) {
    console.error('Error saving events to storage:', error)
    toast.error('Failed to save events')
  }
}
