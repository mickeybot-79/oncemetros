import { useEffect, useRef, useState } from "react"
import { useAddCommentMutation, useAddReplyMutation } from "./postsApiSlice"

const Comments = ({ post, user }) => {

    const [allComments, setAllComments] = useState({})

    const [replying, setReplying] = useState({
        commnt: '',
        user: ''
    })

    useEffect(() => {
        setAllComments(post.comments)
    }, [post])

    const [newComment, setNewComment] = useState('')

    const [newReply, setNewReply] = useState('')

    const [displayCommentLoader, setDisplayCommentLoader] = useState('none')

    const [displayReplyLoader, setDisplayReplyLoader] = useState('none')

    const [displayReplies, setDisplayReplies] = useState([])

    const [addComment] = useAddCommentMutation()

    const [addReply] = useAddReplyMutation()

    const newCommentRef = useRef()
    const allCommentsRef = useRef()

    const handleSubmit = async () => {
        setDisplayCommentLoader('block')
        const result = await addComment({
            post: post.searchField,
            userId: user.userId,
            username: user.username,
            image: user.image,
            content: newComment
        })
        if (result?.data?.searchField) {
            setNewComment('')
            setAllComments([...result.data.comments])
            setDisplayCommentLoader('none')
        }
    }

    const handleStartReply = (e, comm, usr) => {
        setReplying(() => {
            return {
                commnt: comm,
                user: usr
            }
        })
        if (e.target.parentNode.className === "comment-options-container" || "lower-res-content") {
            newCommentRef.current = e.target.parentNode
            setTimeout(() => {
                window.scrollTo({ top: newCommentRef.current.offsetTop, behavior: 'smooth' })
                newCommentRef.current.focus()
            })
        } else {
            newCommentRef.current = e.target.parentNode.parentNode.parentNode.parentNode
            setTimeout(() => {
                window.scrollTo({ top: newCommentRef.current.offsetTop, behavior: 'smooth' })
                newCommentRef.current.focus()
            })
        }
    } 

    const handlePostReply = async (comment, usr) => {
        setDisplayReplyLoader('block')
        const result = await addReply({
            post: post.searchField,
            comment,
            userId: user.userId,
            username: user.username,
            image: user.image,
            content: newReply,
            replyTo: usr
        })
        //console.log(result)
        if (result?.data?.searchField) {
            setNewReply('')
            setReplying('')
            setAllComments([...result.data.comments])
            setDisplayReplyLoader('none')
            setDisplayReplies(prev => {
                const newState = [...prev]
                newState.push(comment)
                return newState
            })
        }
    }

    let commentsElements

    if (allComments.length > 0) {
        commentsElements = [...allComments].sort((a, b) => b.date - a.date).map(comment => {
            const postDate = new Date(parseInt(comment.date))
            const convertedDate = postDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

            const commentReplies = comment.replies.map(reply => {

                const replyDate = new Date(parseInt(reply.date))
                const convertedReplyDate = replyDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

                return (
                    <div className="comment-reply-container" key={reply.date}>
                        <div className="lower-res-content" style={{display: window.innerWidth > 500 ? 'none' : 'grid', height: 'fit-content', maxWidth: '1000vh'}}>
                            <div className="lower-res-image-date">
                                <img src={reply.image || "../../Images/favicon.png"} alt="user-image" className="comment-reply-image" />
                                <p className="comment-reply-date">{convertedReplyDate}</p>
                            </div>
                            <p className="comment-reply-content"><a href='...'>{reply.replyTo}</a>{reply.content}</p>
                            <button className="comment-reply-option" onClick={(e) => handleStartReply(e, comment.searchField, reply.username)}>Responder</button>
                        </div>
                        <div style={{display: window.innerWidth < 500 ? 'none' : 'flex', alignItems: 'center', gap:'20px'}}>
                            <img src={reply.image || "../../Images/favicon.png"} alt="user-image" className="comment-reply-image" />
                            <p className="comment-reply-content"><a href='...'>{reply.replyTo}</a>{reply.content}</p>
                        </div>
                        <div style={{display: window.innerWidth < 500 ? 'none' : 'flex'}}>
                            <p className="comment-reply-date">{convertedReplyDate}</p>
                            <button className="comment-reply-option" onClick={(e) => handleStartReply(e, comment.searchField, reply.username)}>Responder</button>
                        </div>
                    </div>
                )
            })
            
            return (
                <div key={comment.searchField}>
                    <div className="comment-container">
                        <div className="lower-res-content" style={{display: window.innerWidth > 500 ? 'none' : 'grid'}}>
                            <div className="lower-res-image-date">
                                <img src={comment.image || "../../Images/favicon.png"} alt="user-image" className="comment-image" />
                                <p className="comment-date">{convertedDate}</p>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                            <button className="comment-reply" onClick={(e) => handleStartReply(e, comment.searchField, comment.username)}>Responder</button>
                        </div>
                        <div className="comment-content-image" style={{display: window.innerWidth < 500 ? 'none' : 'flex'}}>
                            <img src={comment.image || "../../Images/favicon.png"} alt="user-image" className="comment-image" />
                            <p className="comment-content">{comment.content}</p>
                        </div>
                        <div className="comment-date-options" style={{display: window.innerWidth < 500 ? 'none' : 'grid'}}>
                            <p className="comment-date">{convertedDate}</p>
                            <div className="comment-options-container">
                                <button className="comment-reply" onClick={(e) => handleStartReply(e, comment.searchField, comment.username)}>Responder</button>
                            </div>
                        </div>
                    </div>
                    <div className="reply-container" style={{display: replying.commnt === comment.searchField ? 'grid' : 'none'}}>
                        <textarea
                            className="reply-content"
                            onChange={(e) => setNewReply(e.target.value)}
                            value={newReply || `@${replying.user || 'Anónimo'}`}
                        ></textarea>
                        <div id='reply-loader-container' style={{display: displayReplyLoader}}>
                            <div id="reply-loader">
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                        <div className="reply-options">
                            <button className="reply-cancel" onClick={() => {
                                setNewReply('')
                                setReplying({
                                    commnt: '',
                                    user: ''
                                })
                            }}>Cancelar</button>
                            <button className="reply-submit" onClick={() => handlePostReply(comment.searchField)}>Publicar</button>
                        </div>
                    </div>
                    {comment.replies.length > 0 && <div className="comment-replies-container">
                        <p className="comment-replies-amount" onClick={() => setDisplayReplies(prev => {
                            const newState = [...prev]
                            if (!newState.includes(comment.searchField)) {
                                newState.push(comment.searchField)
                            } else {
                                const itemIndex = newState.indexOf(comment.searchField)
                                newState.splice(itemIndex, 1)
                            }
                            return newState
                        })}>Respuestas: ({comment.replies.length})</p>
                        {displayReplies.includes(comment.searchField) && commentReplies}
                    </div>}
                    <hr style={{ width: '100%', height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'black', marginTop: '50px', marginBottom: '50px' }} />
                </div>
            )
        })
    } else {
        commentsElements = (
            <>
                <p id="no-coments"></p>
                <hr style={{ width: '100%', height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'black', marginTop: '50px' }} />
            </>
        )
    }

    console.log(user)

    return (
        <div id="comments-container" ref={allCommentsRef}>
            <div id="new-comment-container">
                <div id="new-comment-img-text">
                    <img src={user?.image || "../../Images/favicon.png"} alt="logo" id="new-comment-icon" />
                    <textarea
                        placeholder="Nuevo comentario..."
                        id="new-comment-content"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <div id='comment-loader-container' style={{display: displayCommentLoader}}>
                        <div id="comment-loader">
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                    </div>
                </div>
                <div id="new-comment-buttons" style={{opacity: newComment !== '' ? 0.9 : 0}}>
                    <button id="new-comment-cancel" disabled={newComment.length > 0 ? false: true} onClick={() => setNewComment('')}>Cancelar</button>
                    <button id="new-comment-submit" disabled={newComment.length > 0 ? false: true} onClick={handleSubmit}>Publicar</button>
                </div>
            </div>
            <h3 id="comment-amount">Comentarios: ({allComments.length})</h3>
            <div id="all-comments">
                {commentsElements}
            </div>
        </div>
    )

}

export default Comments