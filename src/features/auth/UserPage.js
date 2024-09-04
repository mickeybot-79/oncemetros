import { useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "./authApiSlice"


const UserPage = () => {

    const navigate = useNavigate()

    const [sendLogout] = useSendLogoutMutation()

    return (
        <div>
            {/*Logout */}
            <button onClick={async () => {
                await sendLogout()
                window.localStorage.setItem('persist', false)
                navigate(-1)
            }}>Cerrar sesión</button>
            {/*Edit account info (password, image, aboutme, delete account)*/}
            {/*If Editor Role - Edit posts */}
            {/*If Admin Role - Manage teams, add/remove users to/from teams, add/remove user roles*/}
        </div>
    )

}

export default UserPage