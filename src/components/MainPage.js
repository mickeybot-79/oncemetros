import { useEffect, useRef, useState } from "react"
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

    const [backgroundAnimation, setBackGroundAnimation] = useState({
        display: '',
        animation: ''
    })

    const [mainStories, setMainStories] = useState([])

    const [downPromptDisplay, setDownPromptDisplay] = useState({
        display: 'none',
        animation: ''
    })

    const [mainStoriesAnimaton, setMainStoriesAnimation] = useState('')

    useEffect(() => {
        setPresentationHeight('100%')
        setTimeout(() => {
            setHidePresentation('hide-presentation 2s cubic-bezier(.58,.46,.65,1) 1')
            setPresentationHeight('20vh')
            setBackGroundAnimation((prevState) => {
                return {
                    ...prevState,
                    animation: 'background-animation 2s ease-out 1'
                }
            })
        }, 1200)
        
        setTimeout(() => {
            setBackGroundAnimation((prevState) => {
                return {
                    ...prevState,
                    display: 'none'
                }
            })
        }, 3000)

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
                const allPosts = posts.slice(0, 6).map((story) => {
                    let headingEnd
                    const subsHeading = story.heading.substring(0, 100)
                    if (subsHeading[subsHeading.length - 1] !== '.') {
                        headingEnd = `${subsHeading}...`
                    } else {
                        headingEnd = subsHeading
                    }
                    let titleEnd
                    const subsTitle = story.title.substring(0, 70)
                    if (story.title.length > 70) {
                        titleEnd = `${subsTitle}...`
                    } else {
                        titleEnd = subsTitle
                    }
                    return (
                        <div key={story._id} className="main-story" style={{animation: mainStoriesAnimaton}}>
                            <img src={story.thumbnail} alt="story" className="story-thumbnail" />
                            <h4 className="story-title">{titleEnd}</h4>
                            <p className="story-heading">{headingEnd}</p>
                        </div>
                    )
                })
                return allPosts
            })
        }
    }, [isSuccess, posts, mainStoriesAnimaton])

    // useEffect(() => {
    //     setInterval(() => {
    //         setTimeout(() => {
    //             setMainStoriesAnimation('stories-scroll 1s linear 1')
    //         }, 4000)
    //         setMainStories((prevState) => {
    //             const currentStories = [...prevState]
    //             const newArray = []
    //             for (let i = 1; i < currentStories.length; i++) {
    //                 newArray.push(currentStories[i])
    //             }
    //             newArray.push(currentStories[0])
    //             return newArray
    //         })
    //     }, 5000)
    // }, [])

    return (
        <>
            <div id="background-div" style={{display: backgroundAnimation.display, animation: backgroundAnimation.animation}}></div>
            <PageHeader />
            <div id="main-page-container">
                {/*Presentation*/}
                <section id="presentation-content" style={{ height: presentationHeight, animation: hidePresentation, display: presentationDisplay }}>
                    <img src="../Images/logo.jpg" alt="logo" id="logo-presentation" />
                </section>
                <main style={{ display: presentationDisplay === 'none' ? 'grid' : 'none' }}>
                    {/*Main stories*/}
                    <section id="main-stories">
                        <div id="main-stories-container">
                            <div id="stories-scroll-container">
                                {mainStories}
                            </div>
                        </div>
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