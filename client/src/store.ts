import { makeAutoObservable } from 'mobx'
import { fetchUser, loginUser } from './api/user'
import { Data } from './types'

interface IUserStore {}

type UserType = {
  _id: string
  phone: string
  name?: string
  email?: string
}

class UserStore implements IUserStore {
  user: UserType | null | undefined = undefined
  loading: boolean = true
  error: {} | null = null

  constructor() {
    makeAutoObservable(this)
  }
  me = async () => {
    try {
      const data = await fetchUser()
      console.log('ME ', data)
      this.setData('user', data || null)
    } catch (e: any) {
      let error: any = {
        'Network Error': 'Нет подключения к серверу',
      }
      if (e.response?.status === 401) return this.setData('user', null)
      this.setData('error', error[e.message] || 'Ошибка сервера')
    } finally {
      this.setData('loading', false)
    }
  }
  login = async () => {
    try {
      const data = await loginUser()
      console.log('LOGIN ', data)
      this.setData('user', data || null)
    } catch (e: any) {
      let error: any = {
        'Network Error': 'Нет подключения к серверу',
      }
      if (e.response?.status === 401) return this.setData('user', null)
      this.setData('error', error[e.message] || 'Ошибка сервера')
    } finally {
      this.setData('loading', false)
    }
  }
  setData(key: string, data: Data | boolean | null) {
    const _this: any = this
    _this[key] = data
  }
}

export default new UserStore()
