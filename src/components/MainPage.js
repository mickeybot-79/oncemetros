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

    const [backgroundAnimation, setBackGroundAnimation] = useState({
        display: '',
        animation: ''
    })

    const [mainStories, setMainStories] = useState([])

    const [downPromptDisplay, setDownPromptDisplay] = useState({
        display: 'none',
        animation: ''
    })

    const [mainStoriesAnimaton, setMainStoriesAnimation] = useState({
        transform: '',
        transition: ''
    })

    const [leftScroll, setLeftScroll] = useState(0)
    const [count, setCount] = useState(0)

    const [autoScroll, setAutoScroll] = useState(true)

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
                const finalPosts = []
                const allPosts = posts.map((story) => {
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
                        <div key={story._id} className="main-story" style={{transform: mainStoriesAnimaton.transform, transition: mainStoriesAnimaton.transition}}>
                            <img src={story.thumbnail} alt="story" className="story-thumbnail" />
                            <h4 className="story-title">{titleEnd}</h4>
                            <p className="story-heading">{headingEnd}</p>
                        </div>
                    )
                })
                for (let i = 0; i < 100; i++) {
                    finalPosts.push(allPosts)
                }
                return finalPosts
            })
        }
    }, [isSuccess, posts, mainStoriesAnimaton])

    useEffect(() => {
        if (autoScroll) {
            setInterval(() => {
                setCount(prevCount => {
                    const newCount = prevCount + 0.5
                    return newCount
                })
            }, 4000)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const updateAnimation = () => {
            setMainStoriesAnimation(() => {
                return {
                    transition: '1.5s',
                    transform: `translateX(-${count * 321}px)`
                }
            })
        }
        if (autoScroll) updateAnimation()
    }, [count, autoScroll])

    useEffect(() => {
        if (!autoScroll) {
            setTimeout(() => {
                //setCount(leftScroll)
                setLeftScroll(0)
                setAutoScroll(true)
            }, 5000)
        }
        // eslint-disable-next-line
    }, [autoScroll])

    const handleScrollLeft = () => {
        setAutoScroll(false)
        const scrollFactor = leftScroll === 0 ? count - 1 : leftScroll - 1
        setLeftScroll(scrollFactor)
        setCount(scrollFactor - 1)
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
    }

    const handleScrollRight = () => {
        setAutoScroll(false)
        const scrollFactor = leftScroll === 0 ? count + 1 : leftScroll + 1
        setLeftScroll(scrollFactor)
        setCount(scrollFactor - 1)
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
    }

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
                        <div id="stories-scroll-left" onClick={handleScrollLeft}><p>{'<'}</p></div>
                        <div id="main-stories-container">
                            <div id="stories-scroll-container">
                                {mainStories}
                            </div>
                        </div>
                        <div id="stories-scroll-right" onClick={handleScrollRight}><p>{'>'}</p></div>
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