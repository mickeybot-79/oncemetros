import { useNavigate, useParams } from "react-router-dom"
import { useGetUserProfileQuery } from "./authApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import PageHeader from "../../components/PageHeader"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { useEffect } from "react"

const ProfilePage = () => {

    const navigate = useNavigate()

    const token = window.localStorage.getItem('token')
    const tokenTest = useSelector(selectCurrentToken)
    if (tokenTest) console.log(tokenTest)
    if (token) console.log(token)

    useEffect(() => {
        if (tokenTest) console.log(tokenTest)
        if (token) console.log(token)
        console.log('ok')
        //eslint-disable-next-line
    }, [token, tokenTest])

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

        setTimeout(() => {
            if (tokenTest) {
                console.log(tokenTest)
            } else {
                console.log('no')
            }
            if (token) {
                console.log(token)
            } else {
                console.log('no')
            }
        }, 100)

        console.log('ok')

        const joinedDate = new Date(parseInt(user.memberSince))
        const convertedDate = joinedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

        return (
            <>
                <PageHeader />
                <div id="user-profile-container">
                    <div id="profile-container">
                        <img src={user.image} alt="user-image" id="user-profile-image" />
                        <div id="username-membersince-container">
                            <p id="user-profile-username">{user.username}</p>
                            <p id="user-profile-membersince">Miembro desde {convertedDate}</p>
                        </div>
                        <p id="user-profile-aboutme">{user.aboutme}</p>
                        {user.posts.length > 0 && (<p id="profile-posts-button" onClick={() => navigate(`/posts/${user.username}`)}>Ver publicaciones de {user.username}<span>↗</span></p>)}
                    </div>
                </div>
            </>
        )
    }
}

export default ProfilePage