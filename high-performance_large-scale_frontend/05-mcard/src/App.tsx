import PrivateRoute from '@components/auth/PrivateRoute'
import NavBar from '@components/shared/NavBar'
import ScrollToTop from '@components/shared/ScrollToTop'
import ApplyPage from '@pages/Apply'
import CardPage from '@pages/Card'
import HomePage from '@pages/Home'
import Signin from '@pages/Signin'
import SignupPage from '@pages/Signup'
import TestPage from '@pages/Test'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ApplyDonePage from './pages/ApplyDone'
import MyPage from './pages/My'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/signin" Component={Signin} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDonePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />

        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
