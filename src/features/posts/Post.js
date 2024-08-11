const Post = ({ post }) => {

    const allKeys = []

    const allParagraphElements = post.content.split('\n').map(paragraph => {
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

    const tagElements = post.tags.map(tag => {
        const endingComma = post.tags.indexOf(tag) < post.tags.length - 1 ? ',' : ''
        return (
            <p key={post.tags.indexOf(tag)} className="post-tag">{tag}{endingComma}</p>
        )
    })

    const convertedDate = new Date(parseInt(post.date)).toDateString(undefined, { timeZone: 'Asia/Kolkata' })
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
        <div id="post-container">
            <h2 id="post-title">{post.title}</h2>
            <img id="post-thumbnail" src={post.thumbnail} alt="post-thumbnail" />
            <div style={{display: 'flex'}}>
                <p id="post-imgDesc">{post.imgDesc}</p>
                <p style={{marginLeft: '5px', marginRight: '5px'}}>|</p>
                <p id="post-imgCred">{post.imgCred}</p>
            </div>
            <p id="post-heading">{post.heading}</p>
            <div id="post-content">{allParagraphElements}</div>
            <div style={{display: 'inline', placeSelf: 'start'}}>
                <p id="post-author">Por {post.author}</p>
                <p id="post-date">{`${translatedDate[0]} ${translatedDate[1]}, ${translatedDate[2]}`}</p>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left', alignItems: 'center', placeSelf: 'start', lineHeight: '5px'}}>Etiquetas: {tagElements}</div>
        </div>
    )
}

export default Post