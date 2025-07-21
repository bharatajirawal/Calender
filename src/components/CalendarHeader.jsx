import { useEvents, useEventDispatch } from '../context/EventContext'
import { format, addMonths, subMonths } from 'date-fns'
import './CalendarHeader.css'

export default function CalendarHeader() {
  const { currentMonth } = useEvents()
  const dispatch = useEventDispatch()

  const goToPreviousMonth = () => {
    dispatch({ 
      type: 'SET_CURRENT_MONTH', 
      month: subMonths(currentMonth, 1) 
    })
  }

  const goToNextMonth = () => {
    dispatch({ 
      type: 'SET_CURRENT_MONTH', 
      month: addMonths(currentMonth, 1) 
    })
  }

  const goToToday = () => {
    dispatch({ 
      type: 'SET_CURRENT_MONTH', 
      month: new Date() 
    })
  }

  return (
    <div className="calendar-header">
      <button onClick={goToPreviousMonth} className="nav-button">
        &#8249;
      </button>
      
      <div className="month-year">
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={goToToday} className="today-button">
          Today
        </button>
      </div>
      
      <button onClick={goToNextMonth} className="nav-button">
        &#8250;
      </button>
    </div>
  )
}