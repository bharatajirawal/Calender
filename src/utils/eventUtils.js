import { addDays, addWeeks, addMonths, format, parseISO, isBefore } from 'date-fns'

export function generateRecurringEvents(baseEvent) {
  const events = [baseEvent]
  const { recurrence } = baseEvent
  
  if (recurrence.type === 'none') return events

  const startDate = parseISO(baseEvent.date)
  const endDate = recurrence.endDate ? parseISO(recurrence.endDate) : addMonths(startDate, 12)
  
  let currentDate = startDate

  switch (recurrence.type) {
    case 'daily':
      while (isBefore(currentDate = addDays(currentDate, recurrence.interval || 1), endDate)) {
        events.push({
          ...baseEvent,
          id: `${baseEvent.id}-${format(currentDate, 'yyyy-MM-dd')}`,
          date: format(currentDate, 'yyyy-MM-dd'),
          isRecurring: true,
          parentId: baseEvent.id
        })
      }
      break

    case 'weekly':
      while (isBefore(currentDate = addWeeks(currentDate, recurrence.interval || 1), endDate)) {
        events.push({
          ...baseEvent,
          id: `${baseEvent.id}-${format(currentDate, 'yyyy-MM-dd')}`,
          date: format(currentDate, 'yyyy-MM-dd'),
          isRecurring: true,
          parentId: baseEvent.id
        })
      }
      break

    case 'monthly':
      while (isBefore(currentDate = addMonths(currentDate, recurrence.interval || 1), endDate)) {
        events.push({
          ...baseEvent,
          id: `${baseEvent.id}-${format(currentDate, 'yyyy-MM-dd')}`,
          date: format(currentDate, 'yyyy-MM-dd'),
          isRecurring: true,
          parentId: baseEvent.id
        })
      }
      break
  }

  return events
}

export function checkEventConflict(newEvent, existingEvents) {
  if (!newEvent.time) return false

  return existingEvents.some(event => 
    event.date === newEvent.date && 
    event.time === newEvent.time &&
    event.id !== newEvent.id
  )
}