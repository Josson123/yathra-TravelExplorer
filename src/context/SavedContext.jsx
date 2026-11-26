import { createContext, useContext, useState, useEffect } from 'react'

const SavedContext = createContext(null)

export function SavedProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('travel_saved_trips')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('travel_saved_trips', JSON.stringify(savedIds))
  }, [savedIds])

  const toggleSaved = (id) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const isSaved = (id) => savedIds.includes(id)

  return (
    <SavedContext.Provider value={{ savedIds, toggleSaved, isSaved }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}
