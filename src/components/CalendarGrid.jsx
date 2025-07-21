import { format, isSameDay, isToday, isSameMonth } from 'date-fns'
import { useEventDispatch } from '../context/EventContext'
import CalendarDay from './CalendarDay'
import './CalendarGrid.css'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarGrid({ days, events, onDateClick, currentMonth }) {
  const dispatch = useEventDispatch()

  const handleDrop = (date, draggedEvent) => {
    if (draggedEvent) {
      dispatch({
        type: 'MOVE_EVENT',
        eventId: draggedEvent.id,
        newDate: format(date, 'yyyy-MM-dd')
      })
    }
  }

  const getEventsForDay = (day) => {
    return events.filter(event => 
      isSameDay(new Date(event.date), day)
    )
  }

  return (
    <div className="calendar-grid">
      <div className="weekdays">
        {WEEKDAYS.map(day => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      
      <div className="days-grid">
        {days.map(day => (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            events={getEventsForDay(day)}
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isToday={isToday(day)}
            onClick={() => onDateClick(day)}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  )
}