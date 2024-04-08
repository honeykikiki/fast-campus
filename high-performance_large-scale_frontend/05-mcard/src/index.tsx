import './index.css'

import { AlertContextProvider } from '@contexts/AlertContext'
import { Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import reportWebVitals from './reportWebVitals'
import globalStyles from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {},
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <Global styles={globalStyles} />
        <App />
      </AlertContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()