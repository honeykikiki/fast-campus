import useLoadKakao from '@hooks/useLoadKakao'
import HotelList from '@pages/HotelList'
import TestPage from '@pages/Tests'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthGuard from './components/auth/AuthGuard'
import Nav from './components/shared/NavBar'
import HotelPage from './pages/Hotel'
import MyPage from './pages/My'
import SigninPage from './pages/Signin'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Nav />
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
