const Post = ({ post }) => {

    return (
        <div id="post-container">
            <h2 id="post-title">{post.title}</h2>
            <img id="post-thumbnail" src={post.thumbnail} alt="post-thumbnail" />
            <div>
                <p id="post-imgDesc">{post.imgDesc}</p>
                <p id="post-imgCred">{post.imgCred}</p>
            </div>
            <p id="post-heading">{post.heading}</p>
            <p id="post-content">{post.content.toString()}</p>
            <div>
                <p id="post-author">{post.author}</p>
                <p id="post-date">{post.date}</p>
            </div>
            <p id="post-tags">{post.tags}</p>
        </div>
    )
}

export default Post