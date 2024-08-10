import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"

const PostPage = () => {

    const { id } = useParams()

    const { post } = useGetPostsQuery("postsList", {
        selectFromResult: ({ data }) => ({
            post: data?.entities[id]
        }),
    })

    if (post) {
        return (
            <div id="post-page-container">
                <Post post={post}/>
                <Comments comments={post.comments}/>
            </div>
        )
    }

}

export default PostPage