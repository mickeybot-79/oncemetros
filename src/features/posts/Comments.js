import { useEffect, useRef, useState } from "react"
import { useAddCommentMutation, useAddReplyMutation } from "./postsApiSlice"

const Comments = ({ post }) => {

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

    const [addComment] = useAddCommentMutation()

    const [addReply] = useAddReplyMutation()

    const newCommentRef = useRef()

    const allCommentsRef = useRef()

    const handleSubmit = async () => {
        const result = await addComment({
            post: post.searchField,
            user: '',
            content: newComment
        })
        if (result?.data?.searchField) {
            setNewComment('')
            setAllComments([...result.data.comments])
        }
    }

    const handleStartReply = (e, comm, usr) => {
        setReplying(() => {
            return {
                commnt: comm,
                user: usr
            }
        })
        if (e.target.parentNode.className === "comment-options-container") {
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

    const handlePostReply = async (comment, user) => {
        const result = await addReply({
            post: post.searchField,
            comment,
            user: '',
            content: newReply,
            replyTo: user
        })
        console.log(result)
        if (result?.data?.searchField) {
            setNewReply('')
            setReplying('')
            setAllComments([...result.data.comments])
            //window.scrollTo({top: allCommentsRef.current.offsetTop + 100, behavior: 'smooth'})
            // setTimeout(() => {
            //     window.scrollTo({top: allCommentsRef.current.offsetTop - 100, behavior: 'smooth'})  
            // })
        }
    }

    let commentsElements

    if (allComments.length > 0) {
        commentsElements = [...allComments].sort((a, b) => b.date - a.date).map(comment => {
            const convertedDate = new Date(parseInt(comment.date)).toDateString()
            const translatedDate = []
        
            switch (convertedDate.split(' ')[1]) {
                case 'Jan':
                    translatedDate.push('Enero')
                    break;
                case 'Feb':
                    translatedDate.push('Febrero')
                    break;
                case 'Mar':
                    translatedDate.push('Marzo')
                    break;
                case 'Apr':
                    translatedDate.push('Abril')
                    break;
                case 'May':
                    translatedDate.push('Mayo')
                    break;
                case 'Jun':
                    translatedDate.push('Junio')
                    break;
                case 'Jul':
                    translatedDate.push('Julio')
                    break;
                case 'Aug':
                    translatedDate.push('Agosto')
                    break;
                case 'Sep':
                    translatedDate.push('Septiembre')
                    break;
                case 'Oct':
                    translatedDate.push('Octubre')
                    break;
                case 'Nov':
                    translatedDate.push('Noviembre')
                    break;
                default:
                    translatedDate.push('Diciembre')
            }
        
            translatedDate.push(convertedDate.split(' ')[2])
            translatedDate.push(convertedDate.split(' ')[3])

            const commentReplies = comment.replies.map(reply => {

                const convertedReplyDate = new Date(parseInt(reply.date)).toDateString()
                const translatedReplyDate = []
            
                switch (convertedReplyDate.split(' ')[1]) {
                    case 'Jan':
                        translatedReplyDate.push('Enero')
                        break;
                    case 'Feb':
                        translatedReplyDate.push('Febrero')
                        break;
                    case 'Mar':
                        translatedReplyDate.push('Marzo')
                        break;
                    case 'Apr':
                        translatedReplyDate.push('Abril')
                        break;
                    case 'May':
                        translatedReplyDate.push('Mayo')
                        break;
                    case 'Jun':
                        translatedReplyDate.push('Junio')
                        break;
                    case 'Jul':
                        translatedReplyDate.push('Julio')
                        break;
                    case 'Aug':
                        translatedReplyDate.push('Agosto')
                        break;
                    case 'Sep':
                        translatedReplyDate.push('Septiembre')
                        break;
                    case 'Oct':
                        translatedReplyDate.push('Octubre')
                        break;
                    case 'Nov':
                        translatedReplyDate.push('Noviembre')
                        break;
                    default:
                        translatedReplyDate.push('Diciembre')
                }
            
                translatedReplyDate.push(convertedDate.split(' ')[2])
                translatedReplyDate.push(convertedDate.split(' ')[3])

                return (
                    <div className="comment-reply-container" key={reply.date}>
                        <div style={{display: 'flex', alignItems: 'center', gap:'20px'}}>
                            <img src="../../Images/favicon.png" alt="user-image" className="comment-reply-image" />
                            <p className="comment-reply-content"><a href='...'>{reply.replyTo}</a>{reply.content}</p>
                        </div>
                        <div>
                            <p className="comment-reply-date">{`${translatedReplyDate[0]} ${translatedReplyDate[1]}, ${translatedReplyDate[2]}`}</p>
                            <button className="comment-reply-option" onClick={(e) => handleStartReply(e, comment.searchField, reply.user)}>Responder</button>
                        </div>
                    </div>
                )
            })
            
            return (
                <div key={comment.searchField}>
                    <div className="comment-container">
                        <div className="comment-content-image">
                            <img src="../../Images/favicon.png" alt="user-image" className="comment-image" />
                            <p className="comment-content">{comment.content}</p>
                        </div>
                        <div className="comment-date-options">
                            <p className="comment-date">{`${translatedDate[0]} ${translatedDate[1]}, ${translatedDate[2]}`}</p>
                            <div className="comment-options-container">
                                <button className="comment-reply" onClick={(e) => handleStartReply(e, comment.searchField, comment.user)}>Responder</button>
                            </div>
                        </div>
                    </div>
                    <div className="reply-container" style={{display: replying.commnt === comment.searchField ? 'grid' : 'none'}}>
                        <textarea
                            className="reply-content"
                            onChange={(e) => setNewReply(e.target.value)}
                            value={newReply || `@${replying.user || 'Anónimo'}`}
                        ></textarea>
                        <div style={{placeSelf: 'end', display: 'flex', gap: '20px', padding: '10px'}}>
                            <button className="reply-cancel" onClick={() => {
                                setNewReply('')
                                setReplying({
                                    commnt: '',
                                    user: ''
                                })
                            }}>Cancelar</button>
                            <button className="reply-submit" onClick={() => handlePostReply(comment.searchField, comment.user)}>Publicar</button>
                        </div>
                    </div>
                    {comment.replies.length > 0 && <div>
                        <p style={{marginLeft: '180px'}}>Respuestas: ({comment.replies.length})</p>
                        {commentReplies}
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

    return (
        <div id="comments-container" ref={allCommentsRef}>
            <div id="new-comment-container">
                <div id="new-comment-img-text">
                    <img src="../../Images/favicon.png" alt="logo" id="new-comment-icon" />
                    <textarea
                        placeholder="Nuevo comentario..."
                        id="new-comment-content"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                </div>
                <div id="new-comment-buttons" style={{opacity: newComment !== '' ? 0.9 : 0}}>
                    <button id="new-comment-cancel" disabled={newComment.length > 0 ? false: true} onClick={() => setNewComment('')}>Cancelar</button>
                    <button id="new-comment-submit" disabled={newComment.length > 0 ? false: true} onClick={handleSubmit}>Publicar</button>
                </div>
            </div>
            <h3 style={{marginLeft: '40px'}}>Comentarios: ({post.comments.length})</h3>
            <div id="all-comments">
                {commentsElements}
            </div>
        </div>
    )

}

export default Comments