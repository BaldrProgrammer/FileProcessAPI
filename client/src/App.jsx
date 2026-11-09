import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import WegButton from "./components/WegButton/WegButton.jsx";
import {useState, useRef} from 'react';
import './App.css'

function App() {
  const [aktuellPfad, setAktuellPfad] = useState("/")
  const [suchtext, setSuchtext] = useState("")
  const [aktivButton, setAktivButton] = useState(null)
  const buttonRefs = [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null)
  ]

  function suchen(event) {
      if (event.key === 'Enter') {
          console.log(suchtext)
      }
  }

  function wegButton(buttonIndex) {
      buttonRefs[buttonIndex].current.classList.add('aktiv')
      if (aktivButton) {
          aktivButton.classList.remove('aktiv')
      }
      setAktivButton(buttonRefs[buttonIndex].current)
      console.log(buttonRefs[buttonIndex].current.textContent)
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
                <WegButton text="Hauptfestplatte" ref={buttonRefs[0]} onClick={() => wegButton(0)}/>
                <WegButton text="Weg" ref={buttonRefs[1]} onClick={() => wegButton(1)}/>
                <WegButton text="Zu" ref={buttonRefs[2]} onClick={() => wegButton(2)}/>
                <WegButton text="Filename" ref={buttonRefs[3]} onClick={() => wegButton(3)}/>
                <WegButton text="⏵" onClick={() => pfeilButton('rechte')} welscheSeitePfeil=" RechterPfeil"/>
            </div>
        </section>
        <section className="sortTeil">
            <button className="nameSortButton">

            </button>
            <button className="veranderungSortButton">

            </button>
            <button className="grosseSortButton">

            </button>
        </section>
        <main className="dateiTeil">

        </main>
    </>
  )
}

export default App
