import { useNavigate, useParams } from "react-router-dom"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import LoadingIcon from "./LoadingIcon"

const TagsPage = () => {

    const { tag } = useParams()

    const navigate = useNavigate()

    const {
        data: posts,
        isSuccess,
        isLoading
    } = useGetPostsQuery('postsList', {refetchOnMountOrArgChange: true})

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {

        const allTagPosts = posts?.ids.filter(id => posts?.entities[id].tags.includes(tag))

        const sortedPosts = allTagPosts.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date)
    
        const allPostElements = sortedPosts.map(post => {

            let headingEnd
            const subsHeading = posts?.entities[post].heading.substring(0, 100)
            if (subsHeading[subsHeading.length - 1] !== '.') {
                headingEnd = `${subsHeading}...`
            } else {
                headingEnd = subsHeading
            }
            let titleEnd
            const subsTitle = posts?.entities[post].title.substring(0, 75)
            if (posts?.entities[post].title.length > 75) {
                titleEnd = `${subsTitle}...`
            } else {
                titleEnd = subsTitle
            }
    
            return (
                <div key={posts?.entities[post].id} className="post-tag-container" onClick={() => navigate(`/post/${post}`)}>
                    <img src={posts?.entities[post].thumbnail} alt="" className="post-tag-thumbnail"/>
                    <h3 className="post-tag-title">{titleEnd}</h3>
                    <p className="post-tag-heading">{headingEnd}</p>
                </div>
            )
        })

        return (
            <>
                <PageHeader />
                <div id="tag-posts-container">
                    <h2>Publicaciones sobre <span>"{tag}"</span>:</h2>
                    {allPostElements}
                </div>
            </>
        )
    }
}

export default TagsPage