import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/themes/themesContext.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </>
)
