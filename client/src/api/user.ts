import axios from 'axios'

const api = process.env.REACT_APP_API || '/'

async function fetchUser() {
    const { data }: any = await axios.get(`${api}/profile`)
    return data
}

async function loginUser() {
    const { data }: any = await axios.post(`${api}/login`)
    return data
}

async function updateUser(payload: any) {
    const { data }: any = await axios.post(`${api}/update`, payload)
    return data
}

export { fetchUser, updateUser, loginUser }