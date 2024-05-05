
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'

import Pocetna from './pages/Pocetna'

import Natjecatelji from './pages/natjecatelji/Natjecatelji'
import NatjecateljiDodaj from './pages/natjecatelji/NatjecateljiDodaj'
import NatjecateljiPromjena from './pages/natjecatelji/NatjecateljiPromjena'

import Sezone from './pages/sezone/Sezone'
import SezoneDodaj from './pages/sezone/SezoneDodaj'
import SezonePromjena from './pages/sezone/SezonePromjena'


import ErrorModal from './components/ErrorModal';
import useError from "./hooks/useError"
import LoadingSpinner from './components/LoadingSpinner'

function App() {

  const { errors, prikaziErrorModal, sakrijError } = useError();


  return (
    <>
       <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
       <LoadingSpinner />
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.NATJECATELJ_PREGLED} element={<Natjecatelji />} />
        <Route path={RoutesNames.NATJECATELJ_NOVI} element={<NatjecateljiDodaj />} />
        <Route path={RoutesNames.NATJECATELJ_PROMJENI} element={<NatjecateljiPromjena />} />

        <Route path={RoutesNames.SEZONA_PREGLED} element={<Sezone />} />
        <Route path={RoutesNames.SEZONA_NOVI} element={<SezoneDodaj />} />
        <Route path={RoutesNames.SEZONA_PROMJENI} element={<SezonePromjena />} />
        
      </Routes>
    </>
  )
}

export default App
