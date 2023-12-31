import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap' 
import './App.css'
import Timer from './components/Timer'
import Form from './components/Form'
import useFetch from './hooks/useFetch'
function App() {
  const [listaBanderas, setListaBanderas] = useState([])
  const [banderaActual, setBanderaActual] = useState()
  const [enJuego, setEnJuego] = useState(null)
  const [puntos, setPuntos] = useState(0)
  const [secondsRemaining, setSecondsRemaining] = useState(30)
  const mainInput = useRef()
  const [cheats, setCheats] = useState(false)
  const refInstance = useRef(null)
  const [counter, setCountdown] = useState("00:00")

  const handleSurrender = () => {
    setEnJuego(false)
    setPuntos(0)
  }

  const handleRefresh = (bandera) => {
    reset(voidTime())
    const newBandera = listaBanderas[Math.floor(Math.random() * listaBanderas.length)]
    if (bandera) setBanderaActual(bandera)
    else setBanderaActual(newBandera)
    if (!enJuego) setEnJuego(true)
    if (cheats) mainInput.current.placeholder = newBandera.name
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (mainInput.current.value.toUpperCase() == banderaActual.name.toUpperCase()) {
      mainInput.current.value = null
      setPuntos(prevState => prevState + 1)
      handleRefresh()
    }
  }
  const handleClick = () => {
    if (!cheats) mainInput.current.placeholder = banderaActual.name
    else mainInput.current.placeholder = ''
    setCheats(!cheats)
  }
  // ---------------------------------------------------------------------------
  useEffect(() => async() => {
    const { data } = await useFetch()
    setListaBanderas(data)
    let banderaRandom = data[Math.floor(Math.random() * data.length)]
    handleRefresh(banderaRandom)
    setEnJuego(true)
    reset(voidTime())
  }, [])

  let getCounter = e => {
    let all = Date.parse(e) - Date.parse(new Date())
    let s = Math.floor((all / 1000) % 60)
    let m = Math.floor((all / 1000 / 60) % 60)
    return { all, s, m }
  }
  let initCounter = (e) => {
    let { all, m, s } = getCounter(e)
    if (all >= 0) setCountdown((m > 9 ? m : "0" + m) + ":" + (s > 9 ? s : "0" + s))
    else if(all < 0) setEnJuego(false)
  }
  let reset = (e) => {
    setCountdown("00:" + secondsRemaining)
    if (refInstance.current) clearInterval(refInstance.current)
    let id = setInterval(() => initCounter(e), 1000)
    refInstance.current = id
  }
  let voidTime = () => {
    let voidZone = new Date()
    voidZone.setSeconds(voidZone.getSeconds() + secondsRemaining)
    return voidZone
  }
  return (
    <section className='app-container' id='contador'>
      <h1>Racha: {puntos}</h1>
      <Timer counter={counter} />
      <Button variant='danger' onClick={handleClick}>Toggle cheats</Button>
      <Form handleSubmit={handleSubmit} 
        handleRefresh={handleRefresh} 
        handleSurrender={handleSurrender} 
        banderaActual={banderaActual} 
        enJuego={enJuego} 
        mainInput={mainInput} />
    </section>
  )
}

export default App
