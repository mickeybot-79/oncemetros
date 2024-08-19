import { useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"

const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([])

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 120000
    })

    const handleSearch = () => {

    }

    if (isSuccess) {

        return (
            <>
                <div>
                    <p>Buscar por</p>
                    <select>
                        <option>Título</option>
                        <option>Etiqueta</option>
                        <option>Autor</option>
                    </select>
                    <input />
                    <img src="../Images/search.png" alt="search" />
                </div>
                <div>
                    {searchResults}
                </div>
            </>
        )
    }
}

export default SearchPage