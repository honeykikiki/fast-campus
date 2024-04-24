import useLoadKakao from '@hooks/useLoadKakao'
import HotelList from '@pages/HotelList'
import TestPage from '@pages/Tests'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HotelPage from './pages/Hotel'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
