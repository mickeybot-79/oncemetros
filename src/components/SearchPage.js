import { useRef, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import { useNavigate } from "react-router-dom"
//import allTags from '../config/allTags'
//import { useAddTagMutation } from "../features/posts/postsApiSlice"

const SearchPage = () => {

    //const [addTag] = useAddTagMutation()

    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')

    const [searchResults, setSearchResults] = useState([])

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 3000
    })

    const filterRef = useRef()

    const handleSearch = () => {
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
                        return (
                            <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image"/>
                                <p className="search-result-title">{titleEnd}</p>
                            </div>
                        )
                    })
                    return (
                        <>
                            <p>{postElements.length} resultados de "{searchTerm}":</p>
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
                        return (
                            <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image"/>
                                <p className="search-result-title">{titleEnd}</p>
                            </div>
                        )
                    })
                    return (
                        <>
                            <p>{postElements.length} resultados de "{searchTerm}":</p>
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
                        return (
                            <div key={post} className="search-result-container" onClick={() => navigate(`/post/${post}`)}>
                                <img src={posts?.entities[post].thumbnail} alt="post-image" className="search-result-image"/>
                                <p className="search-result-title">{titleEnd}</p>
                            </div>
                        )
                    })
                    return (
                        <>
                            <p>{postElements.length} resultados de "{searchTerm}":</p>
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
                    {/* <div id="input-search-container">
                    </div> */}
                </div>
                <div id="search-results">
                    {searchResults}
                </div>
            </>
        )
    }
}

export default SearchPage