import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId='437456577968-k8t4aij6l0s1rert4o37cppnkk9smseu.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
