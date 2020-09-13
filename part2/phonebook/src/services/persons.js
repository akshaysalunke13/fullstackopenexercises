import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createPerson = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default {getAll, createPerson, deletePerson, updatePerson}