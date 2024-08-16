import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"
import { useEffect } from "react"

const PostPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { id } = useParams()

    const { post } = useGetPostsQuery("postsList", {
        selectFromResult: ({ data }) => ({
            post: data?.entities[id]
        }),
    })

    if (post) {
        return (
            <>
                <PageHeader />
                <div id="post-page-container">
                    <Post post={post} />
                    {/*Share options*/}
                    <div id="share-options-container"></div>
                    <Comments comments={post.comments} />
                </div>
            </>
        )
    }

};

export default PostPage