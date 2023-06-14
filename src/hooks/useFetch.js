const API = 'https://countriesnow.space/api/v0.1/countries/flag/images'

const useFetch = async(endpoint, data) => {
    // if(!endpoint) throw new Error("Endpoint no establecido!")
    if(!data) return get()
    return post(endpoint, data)
}

const get = async(endpoint) => {
    try {
        const response = await fetch(`${API}`)
        try {
            return await response.json()
        } catch {
            return response.url
        }
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch tipo GET :(")
    }
}

const post = async(endpoint, newData) => {
    try {
        const response = await fetch(`${API}${endpoint}`, {
            method: 'POST',
            headers: { "Accept": 'application/json', "Content-Type": 'application/json', },
            body: JSON.stringify(newData)
        })
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch tipo POST :(")
    }
}

export default useFetch