const Comments = ({ comments }) => {

    let commentsElements

    if (comments.length > 0) {
        commentsElements = comments.map(comment => {
            return (
                <div className="comment-container">
                    <img src="" alt="user-image"/>
                    <p>Comment</p>
                    <p>Date</p>
                    <button>Like</button>
                    <button>Reply</button>
                </div>
            )
        })
    } else {
        commentsElements = (
            <p>Aún no hay comentarios</p>
        )
    }

    return (
        <div id="comments-container">
            {commentsElements}
            <div>
                <img src="" alt=""/>
                <textarea placeholder="Escribe aquí"></textarea>
                <button>Cancelar</button>
                <button>Publicar</button>
            </div>
        </div>
    )

}

export default Comments