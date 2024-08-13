import { useNavigate, useParams } from "react-router-dom"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import { useEffect } from "react"

const TagsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { tag } = useParams()

    const navigate = useNavigate()

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {})

    if (isSuccess) {

        const allTagPosts = posts?.ids.filter(id => posts?.entities[id].tags.includes(tag))
    
        const allPostElements = allTagPosts.map(post => {

            let headingEnd
            const subsHeading = posts?.entities[post].heading.substring(0, 200)
            if (subsHeading[subsHeading.length - 1] !== '.') {
                headingEnd = `${subsHeading}...`
            } else {
                headingEnd = subsHeading
            }
    
            return (
                <div key={posts?.entities[post].id} className="post-tag-container" onClick={() => navigate(`/post/${post}`)}>
                    <img src={posts?.entities[post].thumbnail} alt="" className="post-tag-thumbnail"/>
                    <h3 className="post-tag-title">{posts?.entities[post].title}</h3>
                    <p className="post-tag-heading">{headingEnd}</p>
                </div>
            )
        })

        return (
            <>
                <PageHeader />
                <div id="tag-posts-container">
                    <h2>Publicaciones sobre "{tag}":</h2>
                    {allPostElements}
                </div>
            </>
        )
    }
}

export default TagsPage