import { useEffect, useState } from "react"
import { useAddCommentMutation, useAddReplyMutation } from "./postsApiSlice"

const Comments = ({ post }) => {

    const [allComments, setAllComments] = useState({})

    const [replying, setReplying] = useState('')

    useEffect(() => {
        setAllComments(post.comments)
    }, [post])

    const [newComment, setNewComment] = useState('')

    const [newReply, setNewReply] = useState('')

    const [addComment] = useAddCommentMutation()

    const [addReply] = useAddReplyMutation()

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

    const handleReply = async (comment, user) => {
        const result = await addReply({
            post: post.searchField,
            comment,
            user: '',
            content: newReply,
            replyTo: user
        })
        if (result?.data?.searchField) {
            setNewReply('')
            setReplying('')
            setAllComments([...result.data.comments])
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

                return (
                    <div className="comment-reply-container">
                        <img src="../../Images/favicon.png" alt="user-image"/>
                        <p>{reply.date}</p>
                        <p><a href='...'>{reply.replyTo}</a>{reply.content}</p>
                        <button>Responder</button>
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
                                <button className="comment-reply" onClick={() => setReplying(comment.searchField)}>Responder</button>
                            </div>
                        </div>
                    </div>
                    <div className="reply-container" style={{display: replying === comment.searchField ? 'grid' : 'none'}}>
                        <textarea
                            className="reply-content"
                            defaultValue={`@${comment.user || 'Anonymous'}`}
                            onChange={(e) => setNewReply(e.target.value)}
                        ></textarea>
                        <div style={{placeSelf: 'end', display: 'flex', gap: '20px', padding: '10px'}}>
                            <button className="reply-cancel" onClick={() => setReplying('')}>Cancelar</button>
                            <button className="reply-submit" onClick={() => handleReply(comment.searchField, comment.user)}>Publicar</button>
                        </div>
                    </div>
                    <div>
                        {commentReplies}
                    </div>
                    <hr style={{ width: '100%', height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'black', marginTop: '50px', marginBottom: '50px' }} />
                </div>
            )
        })
    } else {
        commentsElements = (
            <>
                <p id="no-coments">Aún no hay comentarios</p>
                <hr style={{ width: '100%', height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'black', marginTop: '50px' }} />
            </>
        )
    }

    return (
        <div id="comments-container">
            <div id="all-comments">
                {commentsElements}
            </div>
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
                <div id="new-comment-buttons">
                    <button id="new-comment-cancel" disabled={newComment.length > 0 ? false: true} onClick={() => setNewComment('')}>Cancelar</button>
                    <button id="new-comment-submit" disabled={newComment.length > 0 ? false: true} onClick={handleSubmit}>Publicar</button>
                </div>
            </div>
        </div>
    )

}

export default Comments