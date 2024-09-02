import { useNavigate, useParams } from "react-router-dom"
import { useGetPostsQuery } from "./postsApiSlice"
import PageHeader from "../../components/PageHeader"
import LoadingIcon from "../../components/LoadingIcon"

const UserPosts = () => {

    window.scrollTo(0, 0)  

    const { user } = useParams()

    const navigate = useNavigate()

    const {
        data: posts,
        isSuccess,
        isLoading
    } = useGetPostsQuery('postsList', {})

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {

        const allUserPosts = posts?.ids.filter(id => posts?.entities[id].author === user)

        const sortedPosts = allUserPosts.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date)
    
        const userPostElements = sortedPosts.map(post => {

            let headingEnd
            const subsHeading = posts?.entities[post].heading.substring(0, 100)
            if (subsHeading[subsHeading.length - 1] !== '.') {
                headingEnd = `${subsHeading}...`
            } else {
                headingEnd = subsHeading
            }
            let titleEnd
            const subsTitle = posts?.entities[post].title.substring(0, 75)
            if (posts?.entities[post].title.length > 80) {
                titleEnd = `${subsTitle}...`
            } else {
                titleEnd = subsTitle
            }
    
            return (
                <div key={posts?.entities[post].id} className="user-posts-container" onClick={() => navigate(`/post/${post}`)}>
                    <img src={posts?.entities[post].thumbnail} alt="" className="user-posts-thumbnail"/>
                    <h3 className="user-posts-title">{titleEnd}</h3>
                    <p className="user-posts-heading">{headingEnd}</p>
                </div>
            )
        })

        return (
            <>
                <PageHeader />
                <div id="posts-user-container">
                    <h2>Publicaciones de <span>{user}</span>:</h2>
                    {userPostElements}
                </div>
            </>
        )
    }
}

export default UserPosts