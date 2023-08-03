import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/JWTContext.jsx'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <AuthProvider>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </AuthProvider>
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
