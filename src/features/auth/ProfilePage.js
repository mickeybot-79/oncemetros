import { useNavigate, useParams } from "react-router-dom"
import { useGetUserProfileQuery } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import PageHeader from "../../components/PageHeader"

const ProfilePage = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const {
        data: user,
        isSuccess,
        isLoading
    } = useGetUserProfileQuery(id, {
        refetchOnMountOrArgChange: true
    })
    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {

        const joinedDate = new Date(parseInt(user.memberSince))
        const convertedDate = joinedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

        return (
            <>
                <PageHeader />
                <div id="user-profile-container">
                    <div style={{marginLeft: '-150px', display: 'grid'}}>
                        <img src={user.image} alt="user-image" id="user-profile-image" />
                        <div style={{display: 'flex'}}>
                            <p id="user-profile-username">{user.username}</p>
                            <p id="user-profile-membersince">Miembro desde {convertedDate}</p>
                        </div>
                        {/* <p id="profile-aboutme-title">Acerca de {user.username}:</p> */}
                        <p id="user-profile-aboutme">{user.aboutme}</p>
                        {user.posts.length > 0 && (<p id="profile-posts-button" onClick={() => navigate(`/posts/${user.username}`)}>Ver publicaciones de {user.username}<span>↗</span></p>)}
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage