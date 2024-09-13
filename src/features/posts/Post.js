import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { WhatsappShareButton } from "react-share"
import baseUrl from "../../baseurl"

const Post = ({ post }) => {

    const navigate = useNavigate()

    let allParagraphElements

    const [headingContentElement, setHeadingContentElement] = useState([])

    useEffect(() => {
        setTimeout(() => {
            const allKeys = []
            setHeadingContentElement(() => {
                const newHeadingContent = post.heading.split('\n').map(paragraph => {
                    let currentKey
                    for (let i = 0; i < post.heading.split('\n').length; i++) {
                        if (post.heading.split('\n')[i] === '') {
                            currentKey = allKeys.length + 1
                        } else {
                            allKeys.push(paragraph)
                            currentKey = allKeys.length - 1
                        }
                    }
                    return (
                        <p key={currentKey}>{paragraph}</p>
                    )
                })
                return newHeadingContent
            })
        }, 100)
    }, [post.heading])

    if (post.content[0] === '<') {
        setTimeout(() => {
            const contentElement = document.getElementById('post-content')
            allParagraphElements = post.content
            contentElement.innerHTML = allParagraphElements
        })
    } else {
        const allKeys = []
        allParagraphElements = post.content.split('\n').map(paragraph => {
            let currentKey
            for (let i = 0; i < post.content.split('\n').length; i++) {
                if (post.content.split('\n')[i] === '') {
                    currentKey = allKeys.length + 1
                } else {
                    allKeys.push(paragraph)
                    currentKey = allKeys.length - 1
                }
            }
            return (
                <p key={currentKey}>{paragraph}</p>
            )
        })
    }

    const tagElements = post.tags.map(tag => {
        const endingComma = post.tags.indexOf(tag) < post.tags.length - 1 ? ',' : ''
        return (
            <p key={post.tags.indexOf(tag)} className="post-tag" onClick={() => navigate(`/tags/${tag}`)}>{tag}{endingComma}</p>
        )
    })
    const postDate = new Date(parseInt(post.date))
    const convertedDate = postDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

    const imageDescElement = (
        <div style={{ display: 'flex' }}>
            <p id="post-imgDesc">{post.imgDesc} | {post.imgCred} </p>
            {/* <p style={{ marginLeft: '5px', marginRight: '5px' }}>|</p>
            <p id="post-imgCred">{post.imgCred}</p> */}
        </div>
    )

    return (
        <div id="post-container">
            <h2 id="post-title">{post.title}</h2>
            {post.thumbnail && <img id="post-thumbnail" src={post.thumbnail} alt="post-thumbnail" />}
            {post.imgDesc && post.thumbnail && imageDescElement}
            {post.heading && <div id="post-heading">{headingContentElement}</div>}
            <div id="post-content">{allParagraphElements}</div>
            <div style={{ display: 'inline', placeSelf: 'start' }}>
                {/* REDIRECT USERS TO AUTHOR PROFILE INSTEAD OF TAGS PAGE*/}
                <p id="post-author" onClick={() => navigate(`/posts/${post.authorName}`)}>Por <span>{post.authorName}</span></p> 
                <p id="post-date">{convertedDate}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', alignItems: 'center', placeSelf: 'start', lineHeight: '5px' }}>Etiquetas: {tagElements}</div>
            <div id="share-options-container">
                <img src="../../Images/fb-icon.png" alt="fb" className="share-image" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${baseUrl.backend}/share/${post.searchField}`, 'popup','width=600,height=400')}/>
                <img src="../../Images/ins-icon.png" alt="ins" className="share-image" onClick={() => window.open(post.insPost || 'https://www.instagram.com/los11metros_/')}/>
                <img src="../../Images/x-icon.png" alt="x" className="share-image" onClick={() => window.open(`https://twitter.com/share?url=${baseUrl.backend}/share/${post.searchField}`, 'popup', 'width=600,height=400')} />
                <WhatsappShareButton children={''} url={`${baseUrl.backend}/share/${post.searchField}`} title={post.title}>
                    <img src="../../Images/wp-icon.png" alt="wp" className="share-image" />
                </WhatsappShareButton>
            </div>
        </div>
    )
}

export default Post