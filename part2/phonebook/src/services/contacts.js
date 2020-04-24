import axios from 'axios'

const baseURL = 'http://localhost:3001/contacts'

const getAll = () => {
    return axios
            .get(baseURL)
            .then(response => response.data)
}

const create = (newContact) => {
    return axios
            .post(baseURL, newContact)
            .then(response => response.data)
}

const remove = (id) => {
    return axios
        .delete(`${baseURL}/${id}`, {params: { id: id }})       
}

const update = (changedContact) => {
    return axios
        .put(`${baseURL}/${changedContact.id}`, changedContact)
        .then(response => response.data)
}

export default {getAll, create, remove, update}