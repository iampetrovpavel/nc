import axios from 'axios'
import { Data } from '../types'

const api = process.env.REACT_APP_API || '/'

async function fetchUser() {
  const { data }: Data = await axios.get(`${api}/profile`)
  return data
}

async function loginUser() {
  const { data }: Data = await axios.post(`${api}/login`)
  return data
}

async function updateUser(payload: Data) {
  const { data }: Data = await axios.post(`${api}/update`, payload)
  return data
}

export { fetchUser, updateUser, loginUser }
