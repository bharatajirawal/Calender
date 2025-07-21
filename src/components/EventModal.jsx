import { useState, useEffect } from 'react'
import { useEvents, useEventDispatch } from '../context/EventContext'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import './EventModal.css'

export default function EventModal() {
  const { modalOpen, editingEvent, selectedDate } = useEvents()
  const dispatch = useEventDispatch()

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    category: 'personal',
    recurrence: {
      type: 'none',
      interval: 1,
      daysOfWeek: [],
      endDate: ''
    }
  })

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent)
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: format(selectedDate, 'yyyy-MM-dd')
      }))
    }
  }, [editingEvent, selectedDate])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter an event title')
      return
    }

    if (!formData.date) {
      toast.error('Please select a date')
      return
    }
    
    if (editingEvent) {
      dispatch({ type: 'UPDATE_EVENT', event: { ...formData, id: editingEvent.id } })
    } else {
      dispatch({ type: 'ADD_EVENT', event: formData })
    }
    
    handleClose()
  }

  const handleClose = () => {
    dispatch({ type: 'CLOSE_MODAL' })
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      category: 'personal',
      recurrence: {
        type: 'none',
        interval: 1,
        daysOfWeek: [],
        endDate: ''
      }
    })
  }

  const handleDelete = () => {
    if (editingEvent && window.confirm('Are you sure you want to delete this event?')) {
      dispatch({ type: 'DELETE_EVENT', eventId: editingEvent.id })
      handleClose()
    }
  }

  if (!modalOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="health">Health</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recurrence">Recurrence</label>
            <select
              id="recurrence"
              value={formData.recurrence.type}
              onChange={e => setFormData(prev => ({
                ...prev,
                recurrence: { ...prev.recurrence, type: e.target.value }
              }))}
            >
              <option value="none">No Repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {formData.recurrence.type !== 'none' && (
            <div className="form-group">
              <label htmlFor="endDate">End Date (Optional)</label>
              <input
                type="date"
                id="endDate"
                value={formData.recurrence.endDate}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  recurrence: { ...prev.recurrence, endDate: e.target.value }
                }))}
                min={formData.date}
              />
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="cancel-button">
              Cancel
            </button>
            {editingEvent && (
              <button type="button" onClick={handleDelete} className="delete-button">
                Delete
              </button>
            )}
            <button type="submit" className="save-button">
              {editingEvent ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
