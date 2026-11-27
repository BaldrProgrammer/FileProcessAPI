import OrdnerKontextMenu from "./components/OrdnerKontextMenu/OrdnerKontextMenu.jsx";
import Logo from './components/Logo/Logo.jsx'
import Suchenfeld from "./components/Suchenfeld/Suchenfeld.jsx";
import HellDunkelButton from "./components/HellDunkelButton/HellDunkelButton.jsx";
import WegButton from "./components/WegButton/WegButton.jsx";
import SortButton from "./components/SortButton/SortButton.jsx";
import Ordner from "./components/Ordner/Ordner.jsx";
import Datei from "./components/Datei/Datei.jsx";
import SeitenButton from "./components/SeitenButton/SeitenButton.jsx";
import {HauptContext} from "./context/HauptContext.js";
import {useState, useEffect, useRef} from 'react';
import './App.css'


function App() {
    const [aktuellPfad, setAktuellPfad] = useState("")
    const [thema, setThema] = useState('hell')
    const [menu, setMenu] = useState(null);

    const [ordnernAusgewahlt, setOrdnernAusgewahlt] = useState([])
    const [dateienAusgewahlt, setDateienAusgewahlt] = useState([])

    const ordnerRef = useRef(new Map())
    const dateiRef = useRef(new Map())

    const [ordnerListe, setOrdnerListe] = useState([
        {id: 1, name: 'Austria', ordnerPfad: '/Austria', letztAnderung: '01.10.26 01:23'},
        {id: 2, name: 'Czechia', ordnerPfad: '/Czechia', letztAnderung: '28.08.26 14:02'},
        {id: 3, name: 'Germany', ordnerPfad: '/Germany', letztAnderung: '08.11.26 02:08'},
        {id: 4, name: 'Hungary', ordnerPfad: '/Hungary', letztAnderung: '09.02.26 19:30'}
    ])

    const [dateiListe, setDateiListe] = useState([
        {id: 5, name: 'photo.jpg', dateiPfad: '/photo.jpg', letztAnderung: '10.11.26 22:23', grosse: 5784},
        {id: 6, name: 'audio.mp3', dateiPfad: '/audio.mp3', letztAnderung: '13.11.26 00:49', grosse: 2334875},
        {id: 7, name: 'video.mp4', dateiPfad: '/video.mp4', letztAnderung: '13.11.26 01:10', grosse: 14354875},
        {id: 8, name: 'text.txt', dateiPfad: '/text.txt', letztAnderung: '13.11.26 00:08', grosse: 154},
    ])

    function handleContextMenu(e) {
        e.preventDefault();
        setMenu({x: e.clientX, y: e.clientY});
    }

    function closeMenu() {
        setMenu(null);
    }

    return (
        <HauptContext.Provider value={{
            thema, menu, ordnernAusgewahlt, dateienAusgewahlt
        }}>
            <div className='app' onClick={closeMenu}>
                {menu && (
                    <OrdnerKontextMenu closeMenu={closeMenu}/>
                )}
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
                    <Suchenfeld/>
                    <div className='oberButtonsTeil'>
                        <HellDunkelButton setThema={setThema}/>
                    </div>
                </div>
                <div className='wegTeil'>
                    <div className='wegDiv'>
                        <WegButton text="⏴" welscheSeitePfeil=" LinkerPfeil"/>
                        {aktuellPfad.split('/').toSpliced(0, 1).map((ordnerName, index) =>
                            <WegButton text={ordnerName}
                                       ordnerPfad={aktuellPfad.split('/').toSpliced(0, 1).slice(0, index + 1)}
                                       idid={index} setAktuellPfad={setAktuellPfad} key={index}/>
                        )}
                        <WegButton text="⏵" welscheSeitePfeil=" RechterPfeil"/>
                    </div>
                </div>
                <div className="sortTeil">
                    <SortButton text='Name'/>
                    <SortButton text='Änderung'/>
                    <SortButton text='Größe'/>
                </div>
                <main className="dateiTeil">
                    {ordnerListe.map(ordner =>
                        <Ordner
                            key={ordner.id}
                            ref={(elemente) => {
                                if (elemente) {
                                    ordnerRef.current.set(ordner.id, elemente)
                                } else {
                                    ordnerRef.current.delete(ordner.id)
                                }
                            }}
                            args={ordner}
                            setAktuellPfad={setAktuellPfad}
                            setDateienAusgewahlt={setDateienAusgewahlt}
                            setOrdnernAusgewahlt={setOrdnernAusgewahlt}
                            handleContextMenu={handleContextMenu}/>
                    )}
                    {dateiListe.map(datei =>
                        <Datei
                            key={datei.id}
                            ref={(elemente) => {
                                if (elemente) {
                                    dateiRef.current.set(datei.id, elemente)
                                } else {
                                    dateiRef.current.delete(datei.id)
                                }
                            }}
                            args={datei}
                            setOrdnernAusgewahlt={setOrdnernAusgewahlt}
                            setDateienAusgewahlt={setDateienAusgewahlt}
                            handleContextMenu={handleContextMenu}/>
                    )}
                </main>
            </div>
        </HauptContext.Provider>
    )
}

export default App
