import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop'
import CardPage from './pages/Card'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
