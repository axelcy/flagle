import PropTypes from 'prop-types'

const Timer = ({ counter }) => {

    return (
        <>
            <h1 className="h1 alert alert-info text-center">{counter}</h1>
        </>
    )
}

const TimerProps = {
    counter: PropTypes.number,
}

export default Timer