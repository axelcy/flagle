import { useEffect, useRef, useState } from 'react'
import { Button, Form, ProgressBar } from 'react-bootstrap' 
import './App.css'
import useFetch from './hooks/useFetch'
function App() {
  const time = 30 // 30
  const intervalTime = 0.01

  const [listaBanderas, setListaBanderas] = useState([])
  const [banderaActual, setBanderaActual] = useState()
  const [enJuego, setEnJuego] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(time)
  const [puntos, setPuntos] = useState(0)
  const [progressVariant, setProgressVariant] = useState('success')
  const form = useRef()
  const mainInput = useRef()

  const handleSurrender = () => setEnJuego(false)
  // const handleChange = e => setTime(e.target.value)
  const handleSubmit = () => {
    if (!banderaActual) return
    form.current.preventDefault()
    if (mainInput.current.value == banderaActual.name) {
      setPuntos(prevState => prevState + timeRemaining)
      setEnJuego(false)
    }
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && enJuego) {
      e.preventDefault()
      handleSubmit(e)
    }
  })

  const elegirBandera = (num) => {
    if (num) setBanderaActual(num)
    else setBanderaActual(listaBanderas[Math.floor(Math.random() * listaBanderas.length)])
    setEnJuego(true)
  }
  // ---------------------------------------------------------------------------
  useEffect(() => async() => {
    const {data} = await useFetch()
    setListaBanderas(data)
    elegirBandera(data[Math.floor(Math.random() * data.length)])
  }, [])

  const [timerId, setTimerId] = useState()
  const [intervalId, setIntervalId] = useState()
  useEffect(() => {
    if (enJuego) {
      setTimeRemaining(time)
      setTimerId(setTimeout(() => setEnJuego(false), time * 1000))
      setIntervalId(setInterval(() => {
        setTimeRemaining(prevState => prevState - intervalTime), intervalTime * 1000
        console.log("interval")
      }))
    }
    else {
      console.log("intervalid", intervalId)
      clearTimeout(timerId)
      clearInterval(intervalId)
      setTimeRemaining(0)
    }
  }, [enJuego])

  useEffect(() => {
    if (timeRemaining == time) setProgressVariant('success')
    if (timeRemaining <= time * 0.7) setProgressVariant('warning')
    if (timeRemaining <= time * 0.3) setProgressVariant('danger')
    if (timeRemaining <= time * 0.1) setProgressVariant('dark')

    // if (timeRemaining < 0) setTimeRemaining(0)
    if (timeRemaining === 0) {
      setEnJuego(false)
      console.log('se acabo el tiempo')
    }
  }, [timeRemaining])

  const progressLabeel = <h6>{Math.floor(timeRemaining)}</h6>
  return (
    <section className='app-container'>
      <h1>hola weones</h1>
      <Form onSubmit={handleSubmit} ref={form}>
        <Form.Label>Tiempo</Form.Label>
        {/* <Form.Control type="text" placeholder="First name" value={time} disabled={enJuego} onChange={handleChange}/> */}
        
          <Form.Range value={timeRemaining} max={time} min={0 + intervalTime} disabled step={intervalTime} />
        <ProgressBar now={timeRemaining} max={time} min={0 + intervalTime} variant={progressVariant} animated label={progressLabeel} />
        <br></br>
        {banderaActual && <img src={banderaActual.flag} alt={banderaActual.name} />}
        {banderaActual && <Form.Control type="text" placeholder={banderaActual.name} ref={mainInput}/>}
        {enJuego && <Button variant="primary" onClick={handleSurrender}>Rendirse</Button>}
        <Button variant='secondary' onClick={() => elegirBandera()} >Recargar</Button>
        <Button variant='secondary' type='submit' disabled={!enJuego} >Submit</Button>
        <h3>{!enJuego && 'Respuesta: ' + banderaActual.name}</h3>
      </Form>
    </section>
  )
}

export default App
