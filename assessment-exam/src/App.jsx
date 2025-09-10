import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "leaflet/dist/leaflet.css";
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' 
                element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
