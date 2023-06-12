import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap' 
import './App.css'
function App() {
  const [listaBanderas, setListaBanderas] = useState([])
  const [banderaActual, setBanderaActual] = useState()
  const [time, setTime] = useState(5)
  const [enJuego, setEnJuego] = useState(true)
  
  const handleChange = e => setTime(e.target.value)
  const rendirse = () => setEnJuego(false)
  const elegirBandera = (num) => {
    if (!isNaN(parseInt(num))) setBanderaActual(num)
    else setBanderaActual(listaBanderas[Math.floor(Math.random() * listaBanderas.length)])
    setEnJuego(true)
    setTimeout(() => {
      setEnJuego(false)
    }, time * 1000)
  }
  useEffect(() => async() => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
      const {data} = await response.json()
      setListaBanderas(data)
      elegirBandera(data[Math.floor(Math.random() * data.length)])
    } catch (err) {
      console.log(err)
      throw new Error('No se pudo hacer el fetch')
    }
  }, [])
  return (
    <section className='app-container'>
      <h1>hola weones</h1>
      <Form.Label>Time</Form.Label>
      <Form.Control type="text" placeholder="First name" value={time} disabled={enJuego} onChange={handleChange}/>
      {banderaActual && <img src={banderaActual.flag} alt={banderaActual.name} />}
      {enJuego && <Button variant="primary" onClick={rendirse}>Rendirse</Button>}
      <Button variant='secondary' onClick={elegirBandera} >Recargar</Button>
      <h3>{!enJuego && 'Respuesta: ' + banderaActual.name}</h3>
    </section>
  )
}

export default App
