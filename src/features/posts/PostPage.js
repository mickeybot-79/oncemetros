import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"
import { useEffect } from "react"
// import { useShareTestMutation } from "./postsApiSlice"

const PostPage = () => {

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const { post } = useGetPostsQuery("postsList", {
        pollingInterval: 600000,
        selectFromResult: ({ data }) => ({
            post: data?.entities[id]
        }),
    })

    // const [shareTest] = useShareTestMutation()

    // useEffect(() => {
    //     //setTimeout(() => {
    //         if (post?.title) {
    //             const createShareFile = async () => {
    //                 //const result = await shareTest({
    //                 await shareTest({
    //                     url: `https://oncemetros.onrender.com/post/${post?.searchField}`,
    //                     title: post?.title,
    //                     description: post?.heading,
    //                     image: `https://oncemetros.onrender.com/Images/${post?.searchField}.jpg`,
    //                     post: post?.searchField
    //                 })
    //                 //console.log(result)
    //             }
    //             createShareFile()
    //         }
    //     //}, 2000)
    // }, [post, shareTest])

    if (post) {
        return (
            <>
                <PageHeader />
                <div id="post-page-container">
                    <Post post={post} />
                    <Comments post={post}/>
                </div>
            </>
        )
    }

};

export default PostPage