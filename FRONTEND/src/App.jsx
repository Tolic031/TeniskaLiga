import { useState } from 'react'
import reactLogo from './assets/react.svg'
import mojLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import Natjecatelji from './pages/natjecatelji/Natjecatelji'
import NatjecateljiDodaj from './pages/natjecatelji/NatjecateljiDodaj'
import NatjecateljiPromjena from './pages/natjecatelji/NatjecateljiPromjena'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.NATJECATELJ_PREGLED} element={<Natjecatelji />} />
        <Route path={RoutesNames.NATJECATELJ_NOVI} element={<NatjecateljiDodaj />} />
        <Route path={RoutesNames.NATJECATELJ_PROMJENI} element={<NatjecateljiPromjena />} />
        
      </Routes>
    </>
  )
}

export default App
