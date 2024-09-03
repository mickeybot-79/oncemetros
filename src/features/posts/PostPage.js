import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"
import { useEffect, useRef } from "react"
import { useShareTestMutation } from "./postsApiSlice"
import LoadingIcon from "../../components/LoadingIcon"

const PostPage = () => {

    const effectRan = useRef()

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    let currentPost

    const {
        data: posts,
        isSuccess,
        isLoading
    } = useGetPostsQuery('postsList', {
        pollingInterval: 600000,
        refetchOnMountOrArgChange: true
    })

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) currentPost = posts?.entities[id]

    // const [shareTest] = useShareTestMutation()

    // useEffect(() => {
    //     if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
    //         if (post?.title) {
    //             const createShareFile = async () => {
    //                 await shareTest({
    //                     url: `https://oncemetros.onrender.com/post/${post?.searchField}`,
    //                     title: post?.title,
    //                     description: post?.heading.split('\n')[0],
    //                     image: `https://oncemetros.onrender.com/Images/${post?.thumbnail.split('/')[2]}`,
    //                     post: post?.searchField
    //                 })
    //             }
    //             createShareFile()
    //         }
    //     }
    //     return () => effectRan.current = true
    // }, [post, shareTest])

    if (currentPost) {
        return (
            <>
                <PageHeader />
                <div id="post-page-container">
                    <Post post={currentPost} />
                    <Comments post={currentPost}/>
                </div>
            </>
        )
    }

};

export default PostPage