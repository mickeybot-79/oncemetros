import { useParams } from "react-router-dom"
import Post from "./Post"
import { useGetPostsQuery } from "./postsApiSlice"
import Comments from "./Comments"
import PageHeader from "../../components/PageHeader"
import { useEffect } from "react"

const PostPage = () => {

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const { post } = useGetPostsQuery("postsList", {
        pollingInterval: 5000,
        selectFromResult: ({ data }) => ({
            post: data?.entities[id]
        }),
    })

    useEffect(() => {
        //setTimeout(() => {
            if (post?.title) {
                console.log(post)
                const headElement = document.getElementsByTagName('head')[0]
                const meta1 = document.createElement('meta')
                meta1.setAttribute('property', 'og:title')
                meta1.setAttribute('content', `${post?.title}`)
                const meta2 = document.createElement('meta')
                meta2.setAttribute('property', 'og:type')
                meta2.setAttribute('content', 'article')
                const meta3 = document.createElement('meta')
                meta3.setAttribute('property', 'og:description')
                meta3.setAttribute('content', `${post?.heading}`)
                const meta4 = document.createElement('meta')
                meta4.setAttribute('property', 'og:url')
                meta4.setAttribute('content', `${`https://oncemetros.onrender.com/post/${post?.searchField}`}`)
                const meta5 = document.createElement('meta')
                meta5.setAttribute('property', 'og:image')
                meta5.setAttribute('content', `https://oncemetros.onrender.com/Images/${post?.searchField}.jpg`)
                headElement.appendChild(meta1)
                headElement.appendChild(meta2)
                headElement.appendChild(meta3)
                headElement.appendChild(meta4)
                headElement.appendChild(meta5)
            }
        //}, 2000)
    }, [post])

    if (post) {
        return (
            <>
                <PageHeader />
                <div id="post-page-container">
                    <Post post={post} />
                    {/*Share options*/}
                    <Comments post={post}/>
                </div>
            </>
        )
    }

};

export default PostPage