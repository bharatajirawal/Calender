import { useState } from 'react'
import { useEvents, useEventDispatch } from '../context/EventContext'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import EventFilters from './EventFilters'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns'
import './Calendar.css'

export default function Calendar() {
  const { currentMonth, events, searchTerm, selectedCategory } = useEvents()
  const dispatch = useEventDispatch()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Filter events for the current month view
  const currentMonthEvents = events.filter(event => {
    const eventDate = parseISO(event.date)
    return days.some(day => isSameDay(day, eventDate))
  })

  // Apply search and category filters
  const filteredEvents = currentMonthEvents.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDateClick = (date) => {
    dispatch({ type: 'SET_SELECTED_DATE', date })
    dispatch({ type: 'OPEN_MODAL' })
  }

  return (
    <div className="calendar">
      <EventFilters />
      <CalendarHeader />
      <CalendarGrid 
        days={days}
        events={filteredEvents}
        onDateClick={handleDateClick}
        currentMonth={currentMonth}
      />
    </div>
  )
}
