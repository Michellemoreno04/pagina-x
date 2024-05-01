import React from 'react'
import ReactDOM from 'react-dom/client'
import  { AppRutas } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider} from 'react-redux'
import { store } from './app/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Provider store={store}> 
    <BrowserRouter>
    <AppRutas />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
