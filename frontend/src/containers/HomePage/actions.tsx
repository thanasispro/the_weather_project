import axios from 'axios'

export const getCities = async(city:string) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await axios.get(url + '/cities//findCity/' + city)
    return promise
}

export const saveLastSelection = async(cities:any[]) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await axios.post(url + '/selects/save/selections', {data: cities})
    return promise
}

export const postCities = async(cities:any[]) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.post(url + '/cities/cities', {data: cities})
    return promise;
}

export const findAll = async() => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.get(url + '/selects/selections')
    return promise;
}