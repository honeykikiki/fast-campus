import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@components/auth/PrivateRoute'
import Nav from '@components/shared/NavBar'
import useLoadKakao from '@hooks/useLoadKakao'
import HotelPage from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import MyPage from '@pages/My'
import ReservationPage from '@pages/Reservation'
import SchedulePage from '@pages/Schedule'
import SettingPage from '@pages/settings'
import LikePage from '@pages/settings/like'
import SigninPage from '@pages/Signin'
import TestPage from '@pages/Tests'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReservationDonePage from './pages/ReservationDone'
import ReservationListPage from './pages/ReservationList'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Nav />
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/like"
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <PrivateRoute>
                <ReservationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation/done"
            element={
              <PrivateRoute>
                <ReservationDonePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation/list"
            element={
              <PrivateRoute>
                <ReservationListPage />
              </PrivateRoute>
            }
          />
          <Route path="/test" element={<TestPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
