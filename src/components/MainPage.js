import { useEffect, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import Presentation from "./Presentation"
import { useNavigate } from "react-router-dom"

const MainPage = () => {

    const navigate = useNavigate()

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 60000
    })

    const [presentationDisplay, setPresentationDisplay] = useState('grid')

    const [backgroundAnimation, setBackGroundAnimation] = useState({
        display: 'block',
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

    const [count, setCount] = useState(-2)

    const [autoScroll, setAutoScroll] = useState(true)

    const [mainStoriesContainerAnimation, setMainStoriesContainerAnimation] = useState('stories-animation 1s linear 1')

    const [timeOfLastClick, setTimeOfLastClick] = useState(0)

    useEffect(() => {
        const backgroundAnimationMark = window.sessionStorage.getItem('backgroundAnimation')
        if (!backgroundAnimationMark) {
            setTimeout(() => {
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

        } else {
            setCount(0)
            setPresentationDisplay('none')
            setMainStoriesContainerAnimation('')
            setBackGroundAnimation(() => {
                return {
                    animation: '',
                    display: 'none'
                }
            })
            setDownPromptDisplay({
                display: 'block',
                animation: 'down-prompt-display 0.3s linear 1'
            })
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setMainStories(() => {
                const filteresPosts = posts?.ids.slice(0, 10)
                const finalPosts = []
                const allPosts = filteresPosts.map((story) => {
                    let headingEnd
                    const subsHeading = posts?.entities[story].heading.substring(0, 95)
                    if (subsHeading[subsHeading.length - 1] !== '.') {
                        headingEnd = `${subsHeading}...`
                    } else {
                        headingEnd = subsHeading
                    }
                    let titleEnd
                    const subsTitle = posts?.entities[story].title.substring(0, 70)
                    if (posts?.entities[story].title.length > 70) {
                        titleEnd = `${subsTitle}...`
                    } else {
                        titleEnd = subsTitle
                    }
                    return (
                        <div key={posts?.entities[story].id} className="main-story" style={{transform: mainStoriesAnimaton.transform, transition: mainStoriesAnimaton.transition}} onClick={() => navigate(`/post/${posts?.entities[story].searchField}`)}>
                            <img src={posts?.entities[story].thumbnail} alt="story" className="story-thumbnail" />
                            <div id="title-heading-container">
                                <h4 className="story-title">{titleEnd}</h4>
                                <p className="story-heading">{headingEnd}</p>
                            </div>
                        </div>
                    )
                })
                for (let i = 0; i < 20; i++) {
                    finalPosts.push(allPosts)
                }
                return finalPosts
            })
        }
    }, [isSuccess, posts, mainStoriesAnimaton, navigate])

    useEffect(() => {
        setInterval(() => {
            if (autoScroll) {
                setCount(prevCount => {
                    const newCount = !document.hidden ? prevCount < 395 ? prevCount + 1 : 0 : prevCount
                    return newCount
                })
            }
        }, 3000)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setInterval(() => {
            setTimeOfLastClick((prevState) => {
                if ((Date.now() - prevState) >= 4000) {
                    if (!autoScroll) {
                        setLeftScroll(0)
                        setAutoScroll(true)
                    } else {
                        setLeftScroll(prevState => prevState)
                        setAutoScroll(prevState => prevState)
                    }
                }
                return prevState
            })
        }, 1000)
    }, [autoScroll, timeOfLastClick])

    useEffect(() => {
        const updateAnimation = () => {
            setMainStoriesAnimation(() => {
                const scrollFactor = (count / 2)
                return {
                    transition: '1.5s',
                    transform: `translateX(-${scrollFactor * 321}px)`
                }
            })
        }
        if (autoScroll) updateAnimation()
    }, [count, autoScroll])

    const handleScrollLeft = () => {
        setAutoScroll(false)
        const prevScrollFactor = (count / 2)
        const scrollFactor = leftScroll === 0 ? prevScrollFactor > 0 ? prevScrollFactor - 1 : 0 : leftScroll > 196 ? 0 : leftScroll - 1
        console.log(scrollFactor)
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
        setTimeOfLastClick(Date.now())
        setLeftScroll(scrollFactor)
        setCount((scrollFactor * 2) - 2)
    }

    const handleScrollRight = () => {
        setAutoScroll(false)
        const prevScrollFactor = (count / 2)
        const scrollFactor = leftScroll === 0 ? prevScrollFactor + 1 : leftScroll > 196 ? 0 : leftScroll + 1
        console.log(scrollFactor)
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor  * 321}px)`
            }
        })
        setTimeOfLastClick(Date.now())
        setLeftScroll(scrollFactor)
        setCount((scrollFactor * 2) - 2)
    }

    return (
        <>
            <div id="background-div" style={{display: backgroundAnimation.display, animation: backgroundAnimation.animation}}></div>
            <PageHeader />
            <div id="main-page-container">
                {/*Presentation*/}
                <Presentation presentationDisplay={presentationDisplay}/>
                <main style={{ display: presentationDisplay === 'none' ? 'grid' : 'none' }}>
                    {/*Main stories*/}
                    <section id="main-stories">
                        <div id="stories-scroll-left" onClick={handleScrollLeft} style={{animation: mainStoriesContainerAnimation}}><p>{'<'}</p></div>
                        <div id="main-stories-container" style={{animation: mainStoriesContainerAnimation}}>
                            <div id="stories-scroll-container" style={{animation: mainStoriesContainerAnimation}}>
                                {mainStories}
                            </div>
                        </div>
                        <div id="stories-scroll-right" onClick={handleScrollRight} style={{animation: mainStoriesContainerAnimation}}><p>{'>'}</p></div>
                    </section>
                    <div id="down-prompt-container" style={{ display: downPromptDisplay.display, animation: downPromptDisplay.animation }}><p id="down-prompt">{'<'}</p></div>
                    {/*Popular stories*/}
                    <section id="popular-stories">

                    </section>
                    {/*Highlights*/}
                    <section id="highlights">

                    </section>
                    {/*Most viewed stories*/}
                    <section id="most-viewed">

                    </section>
                </main>
            </div>
        </>
    )

}

export default MainPage