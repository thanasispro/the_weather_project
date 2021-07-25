import axios from 'axios'

export const getCities = async(city:string) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await axios.get(url + '/cities//findCity/' + city)
    return promise
}

export const saveLastSelection = async(cities:any[], username: string) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await axios.post(url + '/selects/save/selections', {data: cities, username: username})
    return promise
}

export const postCities = async(cities:any[], username: string) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.post(url + '/cities/cities', {data: cities, username: username})
    return promise;
}

export const findAll = async(username:string) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.get(url + '/selects/selections/' + username)
    return promise;
}

export const mostCommon = async() => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.get(url + '/searches/topSearched')
    return promise;
}