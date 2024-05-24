import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthGuard from '@/components/auth/AuthGuard'
import PrivateRoute from '@/components/auth/PrivateRoute'
import Nav from '@/components/shared/NavBar'
import useLoadKakao from '@/hooks/useLoadKakao'

const HotelPage = lazy(() => import('@pages/Hotel'))
const HotelList = lazy(() => import('@pages/HotelList'))
const MyPage = lazy(() => import('@pages/My'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@pages/ReservationList'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const SettingPage = lazy(() => import('@pages/settings'))
const LikePage = lazy(() => import('@pages/settings/like'))
const SigninPage = lazy(() => import('@pages/Signin'))
const TestPage = lazy(() => import('@pages/Tests'))

function App() {
  useLoadKakao()

  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  )
}

export default App
