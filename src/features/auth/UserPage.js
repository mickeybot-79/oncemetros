import { useNavigate, useParams } from "react-router-dom"
import { useGetUserDataQuery, useSendLogoutMutation } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import { useGetPostsQuery } from "../posts/postsApiSlice"
import { useEffect, useRef, useState } from "react"
import EditUser from "./EditUser"
import baseUrl from "../../baseurl"
import useAuth from "./useAuth"
import ResultMessage from "../../components/ResultMessage"

const UserPage = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const effectRan = useRef(false)

    const logged = window.sessionStorage.getItem('logged')

    const {currentUserId, currentUsername, status} = useAuth()

    console.log(status)

    const [resultMessage, setResultMessage] = useState({
        message: 'Sesión cerrada',
        image: '../../Images/success.gif',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            if (status) {
                if (!logged || (currentUserId && currentUserId !== id)) {
                    navigate('/')
                } else {
                }
            }
        }
        return () => effectRan.current = true
    }, [status, currentUserId, id, logged, navigate])

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
        username: currentUsername || '',
        status : status || '',
        userId: currentUserId || '',
        password: '',
        confirmPassword: '',
        email: '',
        image: '',
        aboutme: ''
    })

    useEffect(() => {
        if (isSuccess) setCurrentUser(() => {
            return {
                username: user.username,
                status: status,
                userId: user.userId,
                password: '',
                confirmPassword: '',
                email: user.email,
                image: user.image,
                aboutme: user.aboutme
            }
        })
        //eslint-disable-next-line
    }, [isSuccess, status])

    if (isLoading || isPostLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess && isPostSuccess) {

        console.log(currentUser.status)

        const allUserPosts = [...posts?.ids].filter(post => posts?.entities[post].authorId === id).sort((a, b) => posts?.entities[b].date - posts?.entities[a].date)

        const userPosts = allUserPosts.map(currentPost => {
            return (
                <div key={posts?.entities[currentPost].searchField}>
                    <p className="user-page-edit" onClick={() => navigate(`/post/edit/${posts?.entities[currentPost].searchField}`)}>Editar</p>
                    <div className="user-page-post" onClick={() => navigate(`/post/${posts?.entities[currentPost].searchField}`)}>
                        <img src={posts?.entities[currentPost].thumbnail} alt="post-thumbnail" className="user-page-post-image" />
                        <div>
                            <p className="user-page-post-title">{posts?.entities[currentPost].title}</p>
                            <p>{posts?.entities[currentPost].views} vistas</p>
                            <p>{posts?.entities[currentPost].comments.length} comentarios</p>
                        </div>
                    </div>
                </div>
            )
        })

        const userPostsElement = (
            <div>
                <h3 style={{marginBottom: '30px'}}>Tus publicaciones</h3>
                {userPosts}
            </div>
        )

        return (
            <div id="user-page-container">
                {/* <button id="user-page-back" onClick={() => navigate('/')}><div>➜</div> Inicio</button> */}
                <a href={`${baseUrl.frontend}`} id="new-post-back"><div>➜</div> Inicio</a>
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
                        window.sessionStorage.removeItem('logged')
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                display: 'none',
                                confirmButton: 'none'
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
                    {(currentUser.status === 'Editor' || currentUser.status === 'Admin') && <button id="user-add-post" onClick={() => navigate('/post/new')}>Agregar nueva publicación</button>}
                </div>

                {(currentUser.status === 'Editor' || currentUser.status === 'Admin') && userPostsElement}

                {/* {currentUser.status === 'Admin' && <h3>Ver todas las publicaciones</h3>} */}

                {currentUser.status === 'Admin' && <h3 onClick={() => navigate('/feedback')}>Ver comentarios de los usuarios</h3>}

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
                
                <ResultMessage resultMessage={resultMessage} handleSetResultMessage={(result) => setResultMessage(result)}/>

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