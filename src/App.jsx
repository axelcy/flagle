import { useEffect, useRef, useState } from 'react'
import { Button, Form, ProgressBar } from 'react-bootstrap' 
import './App.css'
import useFetch from './hooks/useFetch'
function App() {
  const [listaBanderas, setListaBanderas] = useState([])
  const [banderaActual, setBanderaActual] = useState()
  const [enJuego, setEnJuego] = useState(null)
  const [puntos, setPuntos] = useState(0)
  const mainInput = useRef()
  const [cheats, setCheats] = useState(false)
  const handleSurrender = () => {
    setEnJuego(false)
    setPuntos(0)
  }

  const handleRefresh = (bandera) => {
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
  }, [])

  return (
    <section className='app-container'>
      <h1>Racha: {puntos}</h1>
      <Button variant='danger' onClick={handleClick}>Toggle cheats</Button>
      <Form onSubmit={handleSubmit} className='form1'>
        {banderaActual && <img src={banderaActual.flag} alt={'banderaActual'} />}
        {banderaActual && <Form.Control type="text" disabled={!enJuego} ref={mainInput}/>}
        {enJuego ? <Button variant="danger" onClick={handleSurrender}>Rendirse</Button> :
        <Button variant="warning" onClick={() => handleRefresh()}>Volver a jugar</Button>}
        <Button variant='success' type='submit' disabled={!enJuego} >Submit</Button>
        {banderaActual && <h3 className='respuesta'>{!enJuego && 'Respuesta: ' + banderaActual.name}</h3>}
      </Form>
    </section>
  )
}

export default App
