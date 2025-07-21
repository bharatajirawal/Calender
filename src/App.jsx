import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Calendar from './components/Calendar'
import EventModal from './components/EventModal'
import { EventProvider } from './context/EventContext'
import './App.css'

function App() {
  return (
    <EventProvider>
      <div className="app">
        <header className="app-header">
          <h1>Event Calendar</h1>
        </header>
        <main className="app-main">
          <Calendar />
          <EventModal />
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </EventProvider>
  )
}

export default App


