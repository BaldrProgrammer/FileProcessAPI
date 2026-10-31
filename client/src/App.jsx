import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import './App.css'

function App() {
  return (
    <>
        <section className="linkeSeitenLeiste">
            <Logo/>
            <Suchenfeld></Suchenfeld>
        </section>
    </>
  )
}

export default App
