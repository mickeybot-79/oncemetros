import { useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"

const SearchPage = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const [searchResults, setSearchResults] = useState([])

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 3000
    })

    const handleSearch = () => {
       //const result = posts.filter(post => post)
       console.log(posts)
    }

    if (isSuccess) {

        return (
            <>
                <PageHeader />
                <div id="search-page-container">
                    <div id="search-filter-options">
                        <p id="filter-title">Buscar por</p>
                        <select id="filter-select">
                            <option>Título</option>
                            <option>Etiqueta</option>
                            <option>Autor</option>
                        </select>
                        <input
                            id="search-input"
                            type="text"
                            placeholder="buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <img id="search-button" src="../Images/search.png" alt="search" onClick={handleSearch} />
                    </div>
                    {/* <div id="input-search-container">
                    </div> */}
                </div>
                <div>
                    {searchResults}
                </div>
            </>
        )
    }
}

export default SearchPage