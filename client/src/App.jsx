import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import WegButton from "./components/WegButton/WegButton.jsx";
import {useState} from 'react';
import './App.css'

function App() {
  const [suchtext, setSuchtext] = useState("")
  function suchen(event) {
      if (event.key === 'Enter') {
          console.log(suchtext)
      }
  }

  return (
    <>
        <aside className='linkeSeitenLeiste'>
            <Logo/>
        </aside>
        <section className='oberTeil'>
            <Suchenfeld beiTasteDruecken={(e) => suchen(e)} beiAenderung={(e) => setSuchtext(e.target.value)}/>
        </section>
        <section className='wegTeil'>
            <div className='wegDiv'>
                <WegButton text="⏴" welscheSeitePfeil=" LinkerPfeil"/>
                <WegButton text="Hauptfestplatte"/>
                <WegButton text="Weg"/>
                <WegButton text="Zu"/>
                <WegButton text="Filename"/>
                <WegButton text="⏵" welscheSeitePfeil=" RechterPfeil"/>
            </div>
        </section>
    </>
  )
}

export default App
