import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"
import { useEffect, useRef } from "react"
import { useShareTestMutation } from "./postsApiSlice"
import LoadingIcon from "../../components/LoadingIcon"
import { useGetUserDataQuery } from "../auth/authApiSlice"
import { jwtDecode } from "jwt-decode"

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

    const token = window.localStorage.getItem('token')
    const userId = token ? jwtDecode(token).UserInfo.id : 'noUser'

    const {
        data: user,
        isSuccess: isUserSuccess,
        isLoading: isUserLoading
    } = useGetUserDataQuery(userId, {
        refetchOnMountOrArgChange: true
    })

    // const [shareTest] = useShareTestMutation()

    // useEffect(() => {
    //     if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
    //         if (posts?.entities[id]?.title) {
    //             const createShareFile = async () => {
    //                 await shareTest({
    //                     url: `https://oncemetros.onrender.com/post/${posts?.entities[id]?.searchField}`,
    //                     title: posts?.entities[id]?.title,
    //                     heading: posts?.entities[id]?.heading.split('\n')[0],
    //                     thumbnail: posts?.entities[id]?.thumbnail,
    //                     post: posts?.entities[id]?.searchField
    //                 })
    //             }
    //             createShareFile()
    //         }
    //     }
    //     return () => effectRan.current = true
    //     //eslint-disable-next-line
    // }, [])

    if (isLoading || isUserLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess && isUserSuccess) {

        //console.log(user)

        currentPost = posts?.entities[id]

        return (
            <>
                <PageHeader />
                <div id="post-page-container">
                    <Post post={currentPost} />
                    <Comments post={currentPost} user={user || ''}/>
                </div>
            </>
        )
    }

};

export default PostPage