import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PackageDetail from './pages/PackageDetail'
import BookingPage from './pages/BookingPage'
import SavedTrips from './pages/SavedTrips'
import { SavedProvider } from './context/SavedContext'
import './index.css'

export default function App() {
  return (
    <SavedProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-mesh scrollbar-glass">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/saved" element={<SavedTrips />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SavedProvider>
  )
}
