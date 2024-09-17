import { useNavigate, useParams } from "react-router-dom"
import { useGetUserDataQuery, useSendLogoutMutation } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import { useGetPostsQuery } from "../posts/postsApiSlice"
import { useEffect, useState } from "react"
import EditUser from "./EditUser"
import { jwtDecode } from "jwt-decode"

const UserPage = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const token = window.localStorage.getItem('token')

    const [resultMessage, setResultMessage] = useState({
        message: 'Sesión cerrada',
        image: '../../Images/success.gif',
        display: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    useEffect(() => {
        const userId = token ? jwtDecode(token).UserInfo.id : ''
        const refreshExpired = window.sessionStorage.getItem('refreshExpired') || ''
        if (refreshExpired) {
            setResultMessage((prevState) => {
                return {
                    ...prevState,
                    message: 'Sesión expirada, por favor vuelve a iniciar sesión.',
                    display: 'grid',
                }
            })
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } else if (!token || userId !== id) {
            navigate('/')
        }
    }, [token, id, navigate])

    const [sendLogout] = useSendLogoutMutation()

    const [waiting, setWaiting] = useState('none')

    const [displayEditOptions, setDisplayEditOptions] = useState(false)

    const [editOptionsAnimation, setEditOptionsAnimation] = useState('')

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

    const [currentUser, setCurrentUser] = useState({
        username: jwtDecode(token).UserInfo.username || '',
        roles: jwtDecode(token).UserInfo.roles || [],
        userId: jwtDecode(token).UserInfo.id|| '',
        password: '',
        confirmPassword: '',
        image: '',
        aboutme: ''
    })

    useEffect(() => {
        if (isSuccess) setCurrentUser(() => {
            return {
                username: user.username,
                roles: user.roles,
                userId: user.userId,
                password: '',
                confirmPassword: '',
                image: user.image,
                aboutme: user.aboutme
            }
        })
    }, [isSuccess, user])

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
                        window.localStorage.removeItem('token')
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
                    <img src={currentUser.image} alt="" id="user-page-image" />
                    <p id="user-page-username">{currentUser.username}</p>
                </div>

                <div id="user-page-options">
                    <button id="user-info-edit" onClick={() => {
                        setDisplayEditOptions(true)
                        setEditOptionsAnimation('edit-form-in 0.2s linear 1')
                    }}>Editar información de la cuenta</button>
                    <button id="user-public-profile" onClick={() => navigate(`/profile/${id}`)}>Ver perfil público</button>
                    {currentUser.roles.includes('Editor') && <button id="user-add-post" onClick={() => navigate('/post/new')}>Agregar nueva publicación</button>}
                </div>

                {/*If Editor Role - Edit own posts */}
                {currentUser.roles.includes('Editor') && userPostsElement}

                {/*If Admin Role - View all posts*/}
                {currentUser.roles.includes('Admin') && <h3>Ver todas las publicaciones</h3>}

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

                <EditUser
                user={currentUser}
                handleUpdateUserData={(userData) => setCurrentUser(userData)}
                displayEditOptions={displayEditOptions} 
                handleCloseEdit={() => setDisplayEditOptions(false)}
                editOptionsAnimation={editOptionsAnimation}
                handleEditOptionsAnimation={(animation) => setEditOptionsAnimation(animation)}
                />

            </div>
        )
    }
}

export default UserPage