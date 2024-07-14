import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './utils/ErrorBoundary.jsx';

const root=document.getElementById("root")
let createdRoot=ReactDOM.createRoot(root)

createdRoot.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <GoogleOAuthProvider clientId='437456577968-k8t4aij6l0s1rert4o37cppnkk9smseu.apps.googleusercontent.com'>
            <App />
          </GoogleOAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
