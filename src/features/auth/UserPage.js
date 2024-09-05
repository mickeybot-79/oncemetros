import { useNavigate, useParams } from "react-router-dom"
import { useGetUserDataQuery, useSendLogoutMutation } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"

const UserPage = () => {

    const navigate = useNavigate()

    const [sendLogout] = useSendLogoutMutation()

    const { id } = useParams()

    const {
        data: user,
        isSuccess,
        isLoading
    } = useGetUserDataQuery(id, {
        refetchOnMountOrArgChange: true
    })

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {
        return (
            <div>
                <button id="user-page-back" onClick={() => navigate('/')}><div>➜</div> Inicio</button>
                <img src={user.image} alt="" />
                <p>{user.username}</p>
                <p>{user.aboutme}</p>
                {/*Logout */}
                <button onClick={async () => {
                    await sendLogout()
                    window.localStorage.setItem('persist', false)
                    navigate(-1)
                }}>Cerrar sesión</button>
                {/* ADD LOGOUT CONFIRMATION*/}
                {/*Edit account info (password, image, aboutme, delete account)*/}
                <button>Editar información de la cuenta</button>
                {/*If Editor Role - Edit posts */}
                {user.roles.includes('Editor') && <h3>Tus publicaciones</h3>}
                {/*If Admin Role - Manage teams, add/remove users to/from teams, add/remove user roles*/}
                {user.roles.includes('Admin') && <h3>Gestionar equipo</h3>}
            </div>
        )
    }
}

export default UserPage