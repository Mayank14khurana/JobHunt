import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'; 
import store from './redux/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
const persistor =persistStore(store);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null}  persistor={persistor}>
      <App /> 
      <Toaster/>
      </PersistGate>
   
    </Provider>
 
  </React.StrictMode>
  
)