import axios from 'axios'
import {SelectionItem} from '../../types/types'

export const cityData = async(city:SelectionItem) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const promise = await  axios.post(url + '/cities/cities', {data: city})
    return promise;
}