import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from "./firebase"
import { useNavigate } from 'react-router-dom'
import UserStore from './store'
import axios from 'axios'
import { observer } from "mobx-react-lite"
import { useForm } from "react-hook-form"
import { updateUser } from './api/user'
import validateEmail from './utils/validate-email'

const Profile = () => {
    const [user, loading, error] = useAuthState(auth)
    const { me, user: info, login } = UserStore;
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/")
        const token = (user as any).accessToken
        axios.defaults.headers.common['Authorization'] = token
        me()
    }, [user, loading])

    useEffect(()=>{
        if(info === null) login()
    }, [info])

    async function updateProfile(data: any) {
        console.log(data)
        if(data.name === info?.name && data.email === info?.email) return
        if(!data.name || data.name.length === 0) return alert('Name not valid')
        if(!validateEmail(data.email)) return alert('Email not valid')
        const user = await updateUser(data)
        console.log("Response ", user)
    }
    if(!user)return <h1>Loading...</h1>
    return (
        <div>
            Phone: {user?.phoneNumber}
            <button onClick={logout}>Logout</button>
            {}
            {info && <form onSubmit={handleSubmit(updateProfile)}>
                <input {...register("name", { value: info?.name || '' })} placeholder='name'/>
                <input {...register("email", { value: info?.email || '' })} placeholder='email'/>
                <button type='submit'>Update</button>
            </form>}
        </div>
    )
}

export default observer(Profile)