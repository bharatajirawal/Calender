import { useEventDispatch } from '../context/EventContext'
import './EventItem.css'

export default function EventItem({ event, onClick }) {
  const dispatch = useEventDispatch()

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(event))
    dispatch({ type: 'SET_DRAGGED_EVENT', event })
  }

  const categoryColors = {
    work: '#3b82f6',
    personal: '#10b981',
    health: '#f59e0b',
    social: '#8b5cf6',
    other: '#6b7280'
  }

  const eventStyle = {
    backgroundColor: categoryColors[event.category] || categoryColors.other,
    borderLeft: `4px solid ${categoryColors[event.category] || categoryColors.other}`
  }

  return (
    <div
      className="event-item"
      style={eventStyle}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      title={`${event.title} - ${event.time}`}
    >
      <div className="event-title">{event.title}</div>
      {event.time && (
        <div className="event-time">{event.time}</div>
      )}
    </div>
  )
}