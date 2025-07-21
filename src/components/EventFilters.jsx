import { useEvents, useEventDispatch } from '../context/EventContext'
import { parseISO, startOfMonth } from 'date-fns'
import './EventFilters.css'

export default function EventFilters() {
  const { searchTerm, selectedCategory, events } = useEvents()
  const dispatch = useEventDispatch()

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    // Find events that match the search term
    const matchingEvents = events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (matchingEvents.length > 0) {
      // Navigate to the month of the first matching event
      const firstEventDate = parseISO(matchingEvents[0].date)
      const monthToNavigate = startOfMonth(firstEventDate)
      
      dispatch({ type: 'SET_CURRENT_MONTH', month: monthToNavigate })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="event-filters">
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events across all months..."
            value={searchTerm}
            onChange={e => dispatch({ type: 'SET_SEARCH_TERM', term: e.target.value })}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button 
            onClick={handleSearch}
            className="search-button"
            disabled={!searchTerm.trim()}
          >
            🔍
          </button>
        </div>
      </div>

      <div className="category-filter">
        <label htmlFor="category-select" className="category-label">
          Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={e => dispatch({ type: 'SET_SELECTED_CATEGORY', category: e.target.value })}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="health">Health</option>
          <option value="social">Social</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  )
}
