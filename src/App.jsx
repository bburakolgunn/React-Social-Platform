
import './App.css'
import { Link,Outlet } from 'react-router-dom'

import { LanguageSelector } from './shared/components/LanguageSelector'
import { useTranslation } from 'react-i18next'
import { NavBar } from './shared/components/NavBar'

function App() {



  //Outlet placeholder belirlemizi sağlar.

  return (
    <>
       <NavBar/>
      <div className='container mt-3'>
      <Outlet/> 
      <LanguageSelector/>
      </div>
    </>
  )
}

export default App
