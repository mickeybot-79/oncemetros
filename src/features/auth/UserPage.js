import { useNavigate, useParams } from "react-router-dom"
import { useGetUserDataQuery, useSendLogoutMutation } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import { useGetPostsQuery } from "../posts/postsApiSlice"

const UserPage = () => {

    const navigate = useNavigate()

    const [sendLogout] = useSendLogoutMutation()

    const { id } = useParams()

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
                <>
                    <p>Editar</p>
                    <div key={posts?.entities[currentPost].searchField} className="user-page-post" onClick={() => navigate(`/post/${posts?.entities[currentPost].searchField}`)}>
                        <img src={posts?.entities[currentPost].thumbnail} alt="post-thumbnail" className="user-page-post-image" />
                        <div>
                            <p className="user-page-post-title">{posts?.entities[currentPost].title}</p>
                            <p>{posts?.entities[currentPost].views} vistas</p>
                        </div>
                    </div>
                </>
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
                    await sendLogout()
                    window.localStorage.setItem('persist', false)
                    navigate('/')
                }}>Cerrar sesión</button>
                <div style={{display: 'flex', gap: '30px', alignContent: 'center', marginBottom: '20px', marginTop: '150px'}}>
                    <img src={user.image} alt="" id="user-page-image" />
                    <p id="user-page-username">{user.username}</p>
                </div>

                {/* <h3>Acerca de {user.username}:</h3>
                <p id="user-page-about">{user.aboutme}</p> */}

                {/* ADD LOGOUT CONFIRMATION*/}

                {/*Edit account info (password, image, aboutme, delete account)*/}
                <div id="user-page-options">
                    <button id="user-info-edit">Editar información de la cuenta</button>
                    <button id="user-public-profile" onClick={() => navigate(`/profile/${id}`)}>Ver perfil público</button>
                    {user.roles.includes('Editor') && <button id="user-add-post" onClick={() => navigate('/post/new')}>Agregar nueva publicación</button>}
                </div>

                {/*If Editor Role - Edit own posts */}
                {user.roles.includes('Editor') && userPostsElement}
                
                {/*If Admin Role - View all posts*/}
                {user.roles.includes('Admin') && <h3>Ver todas las publicaciones</h3>}
            </div>
        )
    }
}

export default UserPage