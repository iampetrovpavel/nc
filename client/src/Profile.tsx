import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from "./firebase";
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        //fetch user data
    }, [user, loading]);
    return (
        <div>
            Profile
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile