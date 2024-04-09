import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/shared/NavBar'
import ScrollToTop from './components/shared/ScrollToTop'
import CardPage from './pages/Card'
import Signin from './pages/Signin'
import SignupPage from './pages/Signup'

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
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
