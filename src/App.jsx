import React from 'react'
import Dashboard from './components/Dashboard'
import CariListesi from './components/cariler/CariListesi'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import CariEkle from './components/cariler/CariEkle'
import CariDuzenle from './components/cariler/CariDuzenle'
import FaturaEkle from './components/cariler/FaturaEkle'
import StokSayfasi from './components/StokSayfasi'
import CariFaturaListesi from './components/CariFaturaListesi'
import GelirListesi from './components/GelirListesi'
import GiderListesi from './components/GiderListesi'
import GiderDuzenle from './components/GiderDuzenle'
import GelirDuzenle from './components/GelirDuzenle'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className=' m-auto text-gray-200'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element = {<Dashboard/>} />
          <Route path='/cariler' element = {<CariListesi/>} />
          <Route path='/cariler/ekle' element = {<CariEkle/>} />
          <Route path='/cariler/duzenle/:id' element = {<CariDuzenle/>} />
          <Route path='/cariler/fatura-ekle/:id' element = {<FaturaEkle/>} />
          <Route path='/cariler/:cariId' element = {<CariFaturaListesi/>} />
          <Route path='/stocks' element = {<StokSayfasi/>} />
          <Route path='/gelirler' element = {<GelirListesi/>} />
          <Route path='/giderler' element = {<GiderListesi/>} />
          <Route path='/giderler/:id' element = {<GiderDuzenle/>} />
          <Route path='/gelirler/:id' element = {<GelirDuzenle/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App