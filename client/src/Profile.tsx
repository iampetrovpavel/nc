import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from './firebase'
import { useNavigate } from 'react-router-dom'
import UserStore from './store'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { updateUser } from './api/user'
import validateEmail from './utils/validate-email'

const Profile = () => {
  const [user, loading] = useAuthState(auth)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { me, user: info, login } = UserStore
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/')
    const token = (user as any).accessToken
    axios.defaults.headers.common['Authorization'] = token
    me()
  }, [user, loading])

  useEffect(() => {
    if (info === null) login()
  }, [info])

  async function updateProfile(data: any) {
    setUpdateSuccess(false)
    if (data.name === info?.name && data.email === info?.email) return
    if (!data.name || data.name.length === 0) return setError('Name not valid')
    if (!validateEmail(data.email)) return setError('Email not valid')
    setUpdateLoading(true)
    setUpdateSuccess(false)
    await updateUser(data)
    setError(null)
    setUpdateSuccess(true)
    setUpdateLoading(false)
  }

  if (!user)
    return (
      <h1 className="title" style={{ color: 'white' }}>
        Loading...
      </h1>
    )

  return (
    <div className="box">
      {error && (
        <div className="notification is-danger">
          <button className="delete" onClick={() => setError(null)}></button>
          {error}
        </div>
      )}
      {updateSuccess && (
        <div className="notification is-success">
          <button
            className="delete"
            onClick={() => setUpdateSuccess(false)}
          ></button>
          Updated successfull
        </div>
      )}
      <h3 className="title is-3">{user?.phoneNumber}</h3>
      <div className="field">
        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>
      {info ? (
        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="field">
            <label className="label is-large">Name:</label>
            <p className="control has-icons-left">
              <input
                className="input is-large"
                {...register('name', { value: info?.name || '' })}
                placeholder="Ilon Mask"
              />
              <span className="icon is-large is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label is-large">Email:</label>
            <p className="control has-icons-left">
              <input
                className="input is-large"
                {...register('email', { value: info?.email || '' })}
                placeholder="example@gmail.com"
              />
              <span className="icon is-large is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                className={
                  updateLoading
                    ? 'button is-success is-loading'
                    : 'button is-success'
                }
                type="submit"
                // disabled={updateLoading}
              >
                Update
              </button>
            </p>
          </div>
        </form>
      ) : (
        <h1 className="title" style={{ color: '#156fba' }}>
          Loading...
        </h1>
      )}
    </div>
  )
}

export default observer(Profile)
