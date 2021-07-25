import axios from 'axios'

export const loginUser = async(data:any) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await axios.post(url + '/user/login', data)
    return promise
}

export const registerUser = async(data:any) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await axios.post(url + '/user/register', data)
    return promise
}
