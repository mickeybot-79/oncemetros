import { useRef, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import { useNavigate } from "react-router-dom"

const SearchPage = () => {

    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')

    const [searchResults, setSearchResults] = useState([])

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 120000
    })

    const filterRef = useRef()

    const handleSearch = async () => {
        if (searchTerm !== '') {
            // the expression "normalize("NFD").replace(/[\u0300-\u036f]/g, "")" removes the Spanish stress marks
            if (filterRef.current.value === 'title') {
                const resultPosts = posts?.ids.filter(post => posts?.entities[post].title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1)
                if (resultPosts.length > 0) {
                    setSearchResults(() => {
                        const postElements = resultPosts.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date).map(post => {
                            let titleEnd
                            const subsTitle = posts?.entities[post].title.substring(0, 60)
                            if (posts?.entities[post].title.length > 60) {
                                titleEnd = `${subsTitle}...`
                            } else {
                                titleEnd = subsTitle
                            }
                            const convertedDate = new Date(parseInt(posts?.entities[post].date)).toDateString(undefined, {})
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
                                <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                    <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image" />
                                    <p className="search-result-title">{titleEnd}</p>
                                    <p className="search-result-author">Por {posts?.entities[post].author}</p>
                                    <p className="search-result-date">{`${translatedDate[0]} ${translatedDate[1]}, ${translatedDate[2]}`}</p>
                                </div>
                            )
                        })
                        return (
                            <>
                                <p id="search-results-label">{postElements.length} resultados de "{searchTerm}":</p>
                                {postElements}
                            </>
                        )
                    })
                } else {
                    setSearchResults(() => {
                        return (
                            <p id="search-results-label">No se encontraron resultados</p>
                        )
                    })
                }
            } else if (filterRef.current.value === 'author') {
                const resultPosts = posts?.ids.filter(post => posts?.entities[post].author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1)
                if (resultPosts.length > 0) {
                    setSearchResults(() => {
                        const postElements = resultPosts.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date).map(post => {
                            let titleEnd
                            const subsTitle = posts?.entities[post].title.substring(0, 60)
                            if (posts?.entities[post].title.length > 60) {
                                titleEnd = `${subsTitle}...`
                            } else {
                                titleEnd = subsTitle
                            }
                            const convertedDate = new Date(parseInt(posts?.entities[post].date)).toDateString(undefined, {})
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
                                <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                    <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image" />
                                    <p className="search-result-title">{titleEnd}</p>
                                    <p className="search-result-author">Por {posts?.entities[post].author}</p>
                                    <p className="search-result-date">{`${translatedDate[0]} ${translatedDate[1]}, ${translatedDate[2]}`}</p>
                                </div>
                            )
                        })
                        return (
                            <>
                                <p id="search-results-label">{postElements.length} resultados de "{searchTerm}":</p>
                                {postElements}
                            </>
                        )
                    })
                } else {
                    setSearchResults(() => {
                        return (
                            <p>No se encontraron resultados</p>
                        )
                    })
                }
            } else if (filterRef.current.value === 'tag') {
                const resultPosts = []
                for (let i = 0; i < posts?.ids.length; i++) {
                    for (let j = 0; j < posts?.entities[posts?.ids[i]].tags.length; j++) {
                        if (posts?.entities[posts?.ids[i]].tags[j].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1) {
                            if (!resultPosts.includes(posts?.ids[i])) resultPosts.push(posts?.ids[i])
                        }
                    }
                }
                if (resultPosts.length > 0) {
                    setSearchResults(() => {
                        const postElements = resultPosts.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date).map(post => {
                            let titleEnd
                            const subsTitle = posts?.entities[post].title.substring(0, 60)
                            if (posts?.entities[post].title.split('').length > 60) {
                                titleEnd = `${subsTitle}...`
                            } else {
                                titleEnd = subsTitle
                            }
                            const convertedDate = new Date(parseInt(posts?.entities[post].date)).toDateString(undefined, {})
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
                                <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                    <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image" />
                                    <p className="search-result-title">{titleEnd}</p>
                                    <p className="search-result-author">Por {posts?.entities[post].author}</p>
                                    <p className="search-result-date">{`${translatedDate[0]} ${translatedDate[1]}, ${translatedDate[2]}`}</p>
                                </div>
                            )
                        })
                        return (
                            <>
                                <p id="search-results-label">{postElements.length} resultados de "{searchTerm}":</p>
                                {postElements}
                            </>
                        )
                    })
                } else {
                    setSearchResults(() => {
                        return (
                            <p>No se encontraron resultados</p>
                        )
                    })
                }
            }
        }
    }

    if (isSuccess) {

        return (
            <>
                <PageHeader />
                <div id="search-page-container">
                    <h2 id="search-page-title">Buscar publicaciones</h2>
                    <div id="search-filter-options">
                        <p id="filter-title">Buscar por</p>
                        <select id="filter-select" defaultValue={'title'} ref={filterRef}>
                            <option value="title">Título</option>
                            <option value="author">Autor</option>
                            <option value="tag">Etiqueta</option>
                        </select>
                        <input
                            id="search-input"
                            type="text"
                            placeholder="término de búsqueda"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <img id="search-button" src="../Images/search.png" alt="search" onClick={handleSearch} />
                    </div>
                </div>
                <div id="search-results">
                    {searchResults}
                </div>
            </>
        )
    }
}

export default SearchPage