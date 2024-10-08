import { useNavigate } from "react-router-dom"
import { useGetTagsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import LoadingIcon from "./LoadingIcon"

const AllTagsPage = () => {

    const navigate = useNavigate()

    const {
        data: tags,
        isSuccess,
        isLoading
    } = useGetTagsQuery('tagsList', {refetchOnMountOrArgChange: true})

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {
        console.log(tags)
        const allTagsElements = [...tags[0].allTags].sort().map(tag => {
            return (
                <p key={tag} className="tag-label" onClick={() => navigate(`/tags/${tag}`)}>{tag}</p>
            )
        })

        return (
            <>
                <PageHeader />
                <div id="all-tags-container">
                    <h2 id="tags-page-header">Todas las etiquetas</h2>
                    {allTagsElements}
                </div>
            </>
        )
    }
}

export default AllTagsPage