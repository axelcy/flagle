import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  useEffect(() => async() => {
    try {
      const response = fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
      setData(await response.json())
    } catch (err) {
      console.log(err)
      throw new Error('No se pudo hacer el fetch')
    }
  })
  return (
    <>
      <h1>hola weones</h1>
      {data}
    </>
  )
}

export default App
