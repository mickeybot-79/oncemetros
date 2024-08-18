import { useState } from "react"

const Comments = ({ comments }) => {

    const [newComment, setNewComment] = useState('')

    let commentsElements

    if (comments.length > 0) {
        commentsElements = comments.map(comment => {
            const convertedDate = new Date(parseInt(comment.date)).toDateString(undefined, {})
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
            return (
                <>
                    <div key={comment._id} className="comment-container">
                        <div className="comment-content-image">
                            <img src="../../Images/favicon.png" alt="user-image" className="comment-image" />
                            <p className="comment-content">{comment.content}</p>
                        </div>
                        <div className="comment-date-options">
                            <p className="comment-date">{`${translatedDate[0]} ${translatedDate[1]}, ${translatedDate[2]}`}</p>
                            <div>
                                <button>{comment.likes} Me gusta</button>
                                <button>Reply</button>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: '100%', height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'black', marginTop: '50px', marginBottom: '50px' }} />
                </>
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
                    <button id="new-comment-submit" disabled={newComment.length > 0 ? false: true}>Publicar</button>
                </div>
            </div>
        </div>
    )

}

export default Comments