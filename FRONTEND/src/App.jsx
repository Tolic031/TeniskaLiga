
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'

import Pocetna from './pages/Pocetna'

import Natjecatelji from './pages/natjecatelji/Natjecatelji'
import NatjecateljiDodaj from './pages/natjecatelji/NatjecateljiDodaj'
import NatjecateljiPromjena from './pages/natjecatelji/NatjecateljiPromjena'

import ErrorModal from './components/ErrorModal';
import useError from "./hooks/useError"

function App() {

  const { errors, prikaziErrorModal, sakrijError } = useError();


  return (
    <>
       <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
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
