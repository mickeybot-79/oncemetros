import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"
import { useEffect, useState } from "react"

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

    //const [currentPost, setCurrentPost] = useState({})

    // const handleSetPost = (post) => {
    //     console.log(post)
    //     setCurrentPost(post)
    // }

    if (post) {
        //  if (!currentPost?.id) setCurrentPost(post)
        return (
            <>
                <PageHeader />
                <div id="post-page-container">
                    <Post post={post} />
                    {/*Share options*/}
                    <div id="share-options-container"></div>
                    {/* <Comments post={currentPost} handleSetPost={handleSetPost}/> */}
                    <Comments post={post}/>
                </div>
            </>
        )
    }

};

export default PostPage