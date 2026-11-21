import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import WegButton from "./components/WegButton/WegButton.jsx";
import Ordner from "./components/Ordner/Ordner.jsx";
import Datei from "./components/Datei/Datei.jsx";
import SeitenButton from "./components/SeitenButton/SeitenButton.jsx";
import { PfadContext } from "./context/PfadContext.js";
import {useState, useRef} from 'react';
import './App.css'

function App() {
    const [aktuellPfad, setAktuellPfad] = useState("/Hauptfestplatte")
    const [suchtext, setSuchtext] = useState("")

    const [ordnerListe, setOrdnerListe] = useState([
        {id: 1, name: 'Austria', ordnerPfad: '/Austria', letztAnderung: '01.10.26 01:23'},
        {id: 2, name: 'Czechia', ordnerPfad: '/Czechia', letztAnderung: '28.08.26 14:02'},
        {id: 3, name: 'Germany', ordnerPfad: '/Germany', letztAnderung: '08.11.26 02:08'},
        {id: 4, name: 'Hungary', ordnerPfad: '/Hungary', letztAnderung: '09.02.26 19:30'}
    ])

    const [dateiListe, setDateiListe] = useState([
        {id: 1, name: 'photo.jpg', dateiPfad: '/photo.jpg', letztAnderung: '10.11.26 22:23', grosse: 5784},
        {id: 2, name: 'audio.mp3', dateiPfad: '/audio.mp3', letztAnderung: '13.11.26 00:49', grosse: 2334875},
        {id: 3, name: 'video.mp4', dateiPfad: '/video.mp4', letztAnderung: '13.11.26 01:10', grosse: 14354875},
        {id: 4, name: 'text.txt', dateiPfad: '/text.txt', letztAnderung: '13.11.26 00:08', grosse: 154},
    ])

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
        }
    }

    function sortButton(name) {
        console.log(`jetzt das sortiert nach ${name}`)
    }

    return (
        <PfadContext.Provider
            value={
                aktuellPfad
            }
        >
            <div>
                <aside className='seitenLeiste'>
                    <Logo/>
                    <div className="seitenButtonsTeil">
                        <SeitenButton text="Neu" istNeuButton={true}/>
                        <SeitenButton text="Favoriten"/>
                        <SeitenButton text="Kürzlich"/>
                        <SeitenButton text="Geteilt"/>
                        <SeitenButton text="Freunden"/>
                        <SeitenButton text="Papierkorb"/>
                    </div>
                    <div className="speicherTeil">

                    </div>
                </aside>
                <div className='oberTeil'>
                    <Suchenfeld beiTasteDruecken={(e) => suchen(e)} beiAenderung={(e) => setSuchtext(e.target.value)}/>
                </div>
                <div className='wegTeil'>
                    <div className='wegDiv'>
                        <WegButton text="⏴" onClick={() => pfeilButton('linke')} welscheSeitePfeil=" LinkerPfeil"/>
                        {aktuellPfad.split('/').toSpliced(0, 1).map((ordnerName, index) =>
                            <WegButton text={ordnerName} key={index}/>
                        )}

                        {/*<WegButton text="Hauptfestplatte" ref={buttonRefs[0]} onClick={() => wegButton(0)}/>*/}
                        {/*<WegButton text="Weg" ref={buttonRefs[1]} onClick={() => wegButton(1)}/>*/}
                        {/*<WegButton text="Zu" ref={buttonRefs[2]} onClick={() => wegButton(2)}/>*/}
                        {/*<WegButton text="Filename" ref={buttonRefs[3]} onClick={() => wegButton(3)}/>*/}
                        <WegButton text="⏵" onClick={() => pfeilButton('rechte')} welscheSeitePfeil=" RechterPfeil"/>
                    </div>
                </div>
                <div className="sortTeil">
                    <button className="nameSortButton" onClick={() => sortButton('Name')}>
                        Name
                    </button>
                    <button className="anderungSortButton" onClick={() => sortButton('Änderung')}>
                        Änderung
                    </button>
                    <button className="grosseSortButton" onClick={() => sortButton('Größe')}>
                        Größe
                    </button>
                </div>
                <main className="dateiTeil">
                    {ordnerListe.map(ordner =>
                        <Ordner args={ordner} key={ordner.id} setAktuellPfad={setAktuellPfad}/>
                    )}
                    {dateiListe.map(datei =>
                        <Datei args={datei} key={datei.id}/>
                    )}
                </main>
            </div>
        </PfadContext.Provider>
    )
}

export default App
