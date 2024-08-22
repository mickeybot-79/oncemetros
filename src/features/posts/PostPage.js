import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"

const PostPage = () => {

    window.scrollTo(0, 0)

    const { id } = useParams()

    const { post } = useGetPostsQuery("postsList", {
        pollingInterval: 5000,
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
                    <Comments post={post}/>
                </div>
            </>
        )
    }

};

export default PostPage