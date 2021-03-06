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

export const postCities = async(cities:any[], username: string, saveToDb?: boolean) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.post(url + '/cities/cities', {data: cities, username: username, saveToDb: saveToDb})
    return promise;
}

export const mostCommon = async(limit:number) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.get(url + '/searches/topSearched/' + limit)
    return promise;
}