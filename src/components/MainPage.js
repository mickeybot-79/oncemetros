import { useEffect, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"

const MainPage = () => {

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {})

    const [presentationHeight, setPresentationHeight] = useState('')

    const [hidePresentation, setHidePresentation] = useState('')

    const [presentationDisplay, setPresentationDisplay] = useState('grid')

    const [mainStories, setMainStories] = useState([])

    const [downPromptDisplay, setDownPromptDisplay] = useState({
        display: 'none',
        animation: ''
    })

    useEffect(() => {
        setPresentationHeight('100%')
        setTimeout(() => {
            setHidePresentation('hide-presentation 2s cubic-bezier(.58,.46,.65,1) 1')
            setPresentationHeight('20vh')
        }, 1200)

        setTimeout(() => {
            setPresentationDisplay('none')
        }, 3200)

        setTimeout(() => {
            setDownPromptDisplay({
                display: 'block',
                animation: 'down-prompt-display 0.3s linear 1'
            })
        }, 5000)
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setMainStories(() => {
                const allPosts = posts.map((story) => {
                    return (
                        <div key={story._id} className="main-story">
                            <img src={`../Images/${story.thumbnail}`} alt="story" className="story-thumbnail" />
                            <h4 className="story-title">{story.title}</h4>
                            <p className="story-summary">{story.summary}</p>
                        </div>
                    )
                })
                return allPosts
            })
        }
    }, [isSuccess, posts])

    return (
        <>
            <PageHeader />
            <div id="main-page-container">
                {/*Presentation*/}
                <section id="presentation-content" style={{ height: presentationHeight, animation: hidePresentation, display: presentationDisplay }}>
                    <img src="../Images/logo.jpg" alt="logo" id="logo-presentation" />
                </section>
                <main style={{ display: presentationDisplay === 'none' ? 'grid' : 'none' }}>
                    {/*Main stories*/}
                    <section id="main-stories">
                        {mainStories}
                    </section>
                    {/* <img src="" alt="down-prompt" id="down-prompt"/> */}
                    <div id="down-prompt-container" style={{ display: downPromptDisplay.display, animation: downPromptDisplay.animation }}><p id="down-prompt">{'<'}</p></div>
                    {/*Popular stories*/}
                    <section>

                    </section>
                    {/*Highlights*/}
                    <section>

                    </section>
                    {/*Most viewed stories*/}
                    <section>

                    </section>
                </main>
            </div>
        </>
    )

}

export default MainPage