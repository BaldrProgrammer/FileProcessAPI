import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import './App.css'

function App() {
  function suchen(event) {
      if (event.key === 'Enter') {
          console.log("нажато")
      }
  }

  return (
    <>
        <section className="linkeSeitenLeiste">
            <Logo/>
        </section>
        <section className="oberSeitenLeiste">
            <Suchenfeld onTasteDruecken={(e) => suchen(e)}/>
        </section>

    </>
  )
}

export default App
