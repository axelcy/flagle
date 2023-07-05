import { Button, Form as Form2 } from 'react-bootstrap' 
import PropTypes from 'prop-types'

const Form = ({ handleSubmit, banderaActual, enJuego, mainInput, handleRefresh, handleSurrender }) => {

    return (
        <Form2 onSubmit={handleSubmit} className='form1'>
            {banderaActual && <img src={banderaActual.flag} alt={'banderaActual'} />}
            {banderaActual && <Form2.Control type="text" disabled={!enJuego} ref={mainInput}/>}
            {enJuego ? <Button variant="danger" onClick={handleSurrender}>Rendirse</Button> :
            <Button variant="warning" onClick={() => handleRefresh()}>Volver a jugar</Button>}
            <Button variant='success' type='submit' disabled={!enJuego} >Submit</Button>
            {banderaActual && <h3 className='respuesta'>{!enJuego && 'Respuesta: ' + banderaActual.name}</h3>}
        </Form2>
    )
}

const FromProps = {
    counter: PropTypes.number,
}

export default Form