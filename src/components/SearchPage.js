import { useCallback, useEffect, useRef, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import { useNavigate } from "react-router-dom"
import LoadingIcon from "./LoadingIcon"

const SearchPage = () => {

    const navigate = useNavigate()

    const currentSearchTerm = window.sessionStorage.getItem('searchTerm')

    const currentSearchCategory = window.sessionStorage.getItem('searchCategory')

    const [searchTerm, setSearchTerm] = useState(currentSearchTerm || '')

    const [searchResults, setSearchResults] = useState([])

    const {
        data: posts,
        isSuccess,
        isLoading
    } = useGetPostsQuery('postsList', {
        pollingInterval: 600000,
        refetchOnMountOrArgChange: true
    })

    const filterRef = useRef()

    const handleSearch = useCallback(async (textToSearch, searchCategory) => {
        try {
            if (textToSearch !== '') {
                textToSearch !== null && window.sessionStorage.setItem('searchTerm', textToSearch)
                searchCategory !== null && window.sessionStorage.setItem('searchCategory', searchCategory)
                // the expression "normalize("NFD").replace(/[\u0300-\u036f]/g, "")" removes the Spanish stress marks
                if (searchCategory === 'title') {
                    const resultPosts = posts?.ids.filter(post => posts?.entities[post].title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(textToSearch.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1)
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
                                const postDate = new Date(parseInt(posts?.entities[post].date))
                                const convertedDate = postDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                                return (
                                    <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                        <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image" />
                                        <p className="search-result-title">{titleEnd}</p>
                                        <p className="search-result-author">Por {posts?.entities[post].authorName}</p>
                                        <p className="search-result-date">{convertedDate}</p>
                                    </div>
                                )
                            })
                            return (
                                <>
                                    <p id="search-results-label">{postElements.length} resultados de "{textToSearch}":</p>
                                    {postElements}
                                </>
                            )
                        })
                    } else {
                        setSearchResults(() => {
                            return (
                                <p id="search-results-label">{textToSearch ? `No hay resultados para "${textToSearch}"` : ''}</p>
                            )
                        })
                    }
                } else if (searchCategory === 'author') {
                    const resultPosts = posts?.ids.filter(post => posts?.entities[post].authorName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(textToSearch.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1)
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
                                const postDate = new Date(parseInt(posts?.entities[post].date))
                                const convertedDate = postDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                                return (
                                    <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                        <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image" />
                                        <p className="search-result-title">{titleEnd}</p>
                                        <p className="search-result-author">Por {posts?.entities[post].authorName}</p>
                                        <p className="search-result-date">{convertedDate}</p>
                                    </div>
                                )
                            })
                            return (
                                <>
                                    <p id="search-results-label">{postElements.length} resultados de "{textToSearch}":</p>
                                    {postElements}
                                </>
                            )
                        })
                    } else {
                        setSearchResults(() => {
                            return (
                                <p id="search-results-label">{textToSearch ? `No hay resultados para "${textToSearch}"` : ''}</p>
                            )
                        })
                    }
                } else if (searchCategory === 'tag') {
                    const resultPosts = []
                    for (let i = 0; i < posts?.ids.length; i++) {
                        for (let j = 0; j < posts?.entities[posts?.ids[i]].tags.length; j++) {
                            if (posts?.entities[posts?.ids[i]].tags[j].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").search(textToSearch.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1) {
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
                                const postDate = new Date(parseInt(posts?.entities[post].date))
                                const convertedDate = postDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                                return (
                                    <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                        <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image" />
                                        <p className="search-result-title">{titleEnd}</p>
                                        <p className="search-result-author">Por {posts?.entities[post].authorName}</p>
                                        <p className="search-result-date">{convertedDate}</p>
                                    </div>
                                )
                            })
                            return (
                                <>
                                    <p id="search-results-label">{postElements.length} resultados de "{textToSearch}":</p>
                                    {postElements}
                                </>
                            )
                        })
                    } else {
                        setSearchResults(() => {
                            return (
                                <p id="search-results-label">{textToSearch ? `No hay resultados para "${textToSearch}"` : ''}</p>
                            )
                        })
                    }
                }
            }

        } catch  {
            console.log('')
        }
    }, [posts, navigate])

    useEffect(() => {
        handleSearch(currentSearchTerm, currentSearchCategory)
        setTimeout(() => {
            try {
                filterRef.current.value = currentSearchCategory || 'title'
            } catch {
                console.log('')
            } 
        })
    }, [currentSearchTerm, currentSearchCategory, handleSearch])

    if (isLoading) {
        return (
            <LoadingIcon />
        )
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
                        <img id="search-button" src="../Images/search.png" alt="search" onClick={() => handleSearch(searchTerm, filterRef.current.value)} />
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