import { useState } from 'react'
import { format } from 'date-fns'
import { useEventDispatch } from '../context/EventContext'
import EventItem from './EventItem'
import toast from 'react-hot-toast'
import './CalendarDay.css'

export default function CalendarDay({ 
  date, 
  events, 
  isCurrentMonth, 
  isToday, 
  onClick, 
  onDrop 
}) {
  const [isDragOver, setIsDragOver] = useState(false)
  const dispatch = useEventDispatch()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    try {
      const eventData = JSON.parse(e.dataTransfer.getData('text/plain'))
      onDrop(date, eventData)
    } catch (error) {
      toast.error('Failed to move event')
    }
  }

  const dayClasses = [
    'calendar-day',
    !isCurrentMonth && 'other-month',
    isToday && 'today',
    isDragOver && 'drag-over'
  ].filter(Boolean).join(' ')

  return (
    <div
      className={dayClasses}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="day-number">
        {format(date, 'd')}
      </div>
      
      <div className="day-events">
        {events.slice(0, 3).map(event => (
          <EventItem
            key={event.id}
            event={event}
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: 'OPEN_MODAL', event })
            }}
          />
        ))}
        {events.length > 3 && (
          <div className="more-events">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  )
}
