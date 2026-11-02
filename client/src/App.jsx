import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import './App.css'
import {useState} from 'react';

function App() {
  const [suchtext, setSuchtext] = useState("")
  function suchen(event) {
      if (event.key === 'Enter') {
          console.log(suchtext)
      }
  }

  return (
    <>
        <section className='linkeSeitenLeiste'>
            <Logo/>
        </section>
        <section className='oberTeil'>
            <Suchenfeld beiTasteDruecken={(e) => suchen(e)} beiAenderung={(e) => setSuchtext(e.target.value)}/>
        </section>
        <section className='wegTeil'>
            <div className='wegDiv'></div>
        </section>
    </>
  )
}

export default App
