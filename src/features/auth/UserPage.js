import { useNavigate, useParams } from "react-router-dom"
import { useGetUserDataQuery, useSendLogoutMutation } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import { useGetPostsQuery } from "../posts/postsApiSlice"
import { useEffect, useState } from "react"
import EditUser from "./EditUser"

const UserPage = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        const userId = window.sessionStorage.getItem('userId')
        if (userId !== id) {
            navigate('/')
        }
    }, [id, navigate])

    const [resultMessage, setResultMessage] = useState({
        message: 'Sesión cerrada',
        image: '../../Images/success.gif',
        display: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const [sendLogout] = useSendLogoutMutation()

    const [waiting, setWaiting] = useState('none')

    const [displayEditOptions, setDisplayEditOptions] = useState(false)

    const {
        data: posts,
        isSuccess: isPostSuccess,
        isLoading: isPostLoading
    } = useGetPostsQuery('postsList', {
        refetchOnMountOrArgChange: true
    })

    const {
        data: user,
        isSuccess,
        isLoading
    } = useGetUserDataQuery(id, {
        refetchOnMountOrArgChange: true
    })

    if (isLoading || isPostLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess && isPostSuccess) {

        const allUserPosts = [...posts?.ids].filter(post => posts?.entities[post].authorId === id).sort((a, b) => posts?.entities[b].date - posts?.entities[a].date)

        const userPosts = allUserPosts.map(currentPost => {
            return (
                <div key={posts?.entities[currentPost].searchField}>
                    <p>Editar</p>
                    <div className="user-page-post" onClick={() => navigate(`/post/${posts?.entities[currentPost].searchField}`)}>
                        <img src={posts?.entities[currentPost].thumbnail} alt="post-thumbnail" className="user-page-post-image" />
                        <div>
                            <p className="user-page-post-title">{posts?.entities[currentPost].title}</p>
                            <p>{posts?.entities[currentPost].views} vistas</p>
                        </div>
                    </div>
                </div>
            )
        })

        const userPostsElement = (
            <div>
                <h3>Tus publicaciones</h3>
                {userPosts}
            </div>
        )

        return (
            <div id="user-page-container">
                <button id="user-page-back" onClick={() => navigate('/')}><div>➜</div> Inicio</button>
                <button id="user-page-logout" onClick={async () => {
                    setWaiting('grid')
                    await sendLogout()
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            display: 'grid'
                        }
                    })
                    setWaiting('none')
                    setTimeout(() => {
                        window.localStorage.setItem('persist', false)
                        window.sessionStorage.removeItem('userId')
                        window.sessionStorage.removeItem('username')
                        window.sessionStorage.removeItem('userRoles')
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                display: 'none'
                            }
                        })
                        navigate('/')
                    }, 2000)
                }}>Cerrar sesión</button>
                <div style={{display: 'flex', gap: '30px', alignContent: 'center', marginBottom: '20px', marginTop: '150px'}}>
                    <img src={user.image} alt="" id="user-page-image" />
                    <p id="user-page-username">{user.username}</p>
                </div>

                <div id="user-page-options">
                    <button id="user-info-edit" onClick={() => setDisplayEditOptions(true)}>Editar información de la cuenta</button>
                    <button id="user-public-profile" onClick={() => navigate(`/profile/${id}`)}>Ver perfil público</button>
                    {user.roles.includes('Editor') && <button id="user-add-post" onClick={() => navigate('/post/new')}>Agregar nueva publicación</button>}
                </div>

                {/*If Editor Role - Edit own posts */}
                {user.roles.includes('Editor') && userPostsElement}

                {/*If Admin Role - View all posts*/}
                {user.roles.includes('Admin') && <h3>Ver todas las publicaciones</h3>}

                <div style={{
                    display: waiting,
                    position: 'fixed',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    placeContent: 'center',
                    placeItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }}>
                    <div className="loader"></div>
                </div>

                <div id="post-result-container" style={{ display: resultMessage.display }}>
                    <div className="result-container" style={{ animation: resultMessage.animation }}>
                        <img src={resultMessage.image} alt="" id="post-result-image" />
                        <p id="post-result-message">{resultMessage.message}</p>
                    </div>
                </div>

                <EditUser displayEditOptions={displayEditOptions} handleCloseEdit={() => setDisplayEditOptions(false)}/>

            </div>
        )
    }
}

export default UserPage