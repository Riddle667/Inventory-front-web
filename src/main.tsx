import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'
import { ThemeContextProvider } from './context/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store} >
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </>
)
