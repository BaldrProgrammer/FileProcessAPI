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

  function pfeilButton(richtung) {
      if (richtung === 'linke') {
          console.log('der linke Pfeil')
      } else if (richtung === 'rechte') {
          console.log('der rechte Pfeil')
  }}

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
                <WegButton text="⏴" onClick={() => pfeilButton('linke')} welscheSeitePfeil=" LinkerPfeil"/>
                <WegButton text="Hauptfestplatte"/>
                <WegButton text="Weg"/>
                <WegButton text="Zu"/>
                <WegButton text="Filename"/>
                <WegButton text="⏵" onClick={() => pfeilButton('rechte')} welscheSeitePfeil=" RechterPfeil"/>
            </div>
        </section>
    </>
  )
}

export default App
