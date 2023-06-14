import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap' 
import './App.css'
import useFetch from './hooks/useFetch'
function App() {
  const time = 10 // 30
  const intervalTime = 0.001

  const [listaBanderas, setListaBanderas] = useState([])
  const [banderaActual, setBanderaActual] = useState()
  const [enJuego, setEnJuego] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(time)
  const [puntos, setPuntos] = useState(0)
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

  useEffect(() => async() => {
    const {data} = await useFetch()
    setListaBanderas(data)
    elegirBandera(data[Math.floor(Math.random() * data.length)])
  }, [])

  useEffect(() => {
    if (enJuego) {
      setTimeRemaining(time)
      var timeOut = setTimeout(() => setEnJuego(false), time * 1000)
      var interval = setInterval(() => setTimeRemaining(prevState => prevState - intervalTime), intervalTime * 1000);
    }
    else {
      interval = clearInterval(interval)
      setTimeRemaining(0)
    }
  }, [enJuego])

  useEffect(() => { if (timeRemaining <= 0) setEnJuego(false) }, [timeRemaining])

  return (
    <section className='app-container'>
      <h1>hola weones</h1>
      <Form onSubmit={handleSubmit} ref={form}>
        <Form.Label>Tiempo</Form.Label>
        {/* <Form.Control type="text" placeholder="First name" value={time} disabled={enJuego} onChange={handleChange}/> */}
        <Form.Range value={timeRemaining} max={time} min={0 + intervalTime} disabled step={intervalTime} />
        {banderaActual && <img src={banderaActual.flag} alt={banderaActual.name} />}
        {banderaActual && <Form.Control type="text" placeholder={banderaActual.name} ref={mainInput}/>}
        {enJuego && <Button variant="primary" onClick={handleSurrender}>Rendirse</Button>}
        <Button variant='secondary' onClick={() => elegirBandera()} >Recargar</Button>
        <Button variant='secondary' type='submit'>Submit</Button>
        <h3>{!enJuego && 'Respuesta: ' + banderaActual.name}</h3>
      </Form>
    </section>
  )
}

export default App
