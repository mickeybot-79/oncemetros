import { useParams } from "react-router-dom"
import { useGetUserProfileQuery } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import { useGetPostsQuery } from "../posts/postsApiSlice"
import PageHeader from "../../components/PageHeader"

const ProfilePage = () => {

    const { id } = useParams()

    const {
        data: user,
        isSuccess,
        isLoading
    } = useGetUserProfileQuery(id, {
        refetchOnMountOrArgChange: true
    })

    const {
        data: posts,
        isSuccess: isPostSuccess,
        isLoading: isPostLoading
    } = useGetPostsQuery('postsList', {
        refetchOnMountOrArgChange: true
    })

    if (isLoading || isPostLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess && isPostSuccess) {

        const joinedDate = new Date(parseInt(user.memberSince))
        const convertedDate = joinedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

        const userPosts = [...posts?.ids].sort((a, b) => posts?.entities[b].date - posts?.entities[a].date).filter(post => posts?.entities[post].authorId === id)

        const userPostElements = userPosts.map(post => {

            return (
                <div className="profile-post-container">
                    <img src={posts?.entities[post].thumbnail} alt="post-image" className="profile-post-image"/>
                    <p className="profile-post-title">{posts?.entities[post].title}</p>
                    <p className="profile-post-views">{posts?.entities[post].views}</p>
                </div>
            )
        })

        const postsElement = (
            <div id="profile-posts-container">
                <p id="profile-posts-title">Publicaciones de {user.username}</p>
                {userPostElements}
            </div>
        )

        return (
            <>
                <PageHeader />
                <div id="user-profile-container">
                    <img src={user.image} alt="user-image" id="user-profile-image"/>
                    <p id="user-profile-username">{user.username}</p>
                    <p id="profile-aboutme-title">Acerca de {user.username}</p>
                    <p id="user-profile-aboutme">{user.aboutme}</p>
                    <p id="user-profile-membersince">Membro desde: {convertedDate}</p>
                </div>
                {user.posts.length > 0 && postsElement}
            </>
        )
    }
}

export default ProfilePage