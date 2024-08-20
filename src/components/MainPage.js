import { useEffect, useRef, useState } from "react"
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
        pollingInterval: 120000
    })

    const [presentationDisplay, setPresentationDisplay] = useState('grid')

    const [backgroundAnimation, setBackGroundAnimation] = useState({
        display: 'block',
        animation: ''
    })

    const [mainStories, setMainStories] = useState([])

    const [popularStories, setPopularStories] = useState([])

    const [downPromptDisplay, setDownPromptDisplay] = useState({
        opacity: '0',
        animation: ''
    })

    const [mainStoriesAnimaton, setMainStoriesAnimation] = useState({
        transform: '',
        transition: ''
    })

    const [leftScroll, setLeftScroll] = useState(0)

    const [count, setCount] = useState(-2)

    const [autoScroll, setAutoScroll] = useState(true)

    const [mainStoriesContainerAnimation, setMainStoriesContainerAnimation] = useState('stories-animation 1.2s linear 1')

    const [timeOfLastClick, setTimeOfLastClick] = useState(0)

    const popularStoriesRef = useRef()

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
                    opacity: '1',
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
                opacity: '1',
                animation: 'down-prompt-display 0.3s linear 1'
            })
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            let mainStoriesArray
            setMainStories(() => {
                const finalPosts = []
                const resultPosts = [...posts?.ids]
                const slicedPosts = resultPosts.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date).slice(0, 10)
                mainStoriesArray = [...slicedPosts]
                const allPosts = slicedPosts.map((story) => {
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
                        <div key={posts?.entities[story].id} className="main-story" style={{transform: mainStoriesAnimaton.transform, transition: mainStoriesAnimaton.transition}} onClick={() => navigate(`/post/${posts?.entities[story].id}`)}>
                            <img src={posts?.entities[story].thumbnail} alt="main-story" className="story-thumbnail" />
                            <div id="title-heading-container">
                                <h4 className="story-title">{titleEnd}</h4>
                                <p className="story-heading">{headingEnd}</p>
                            </div>
                        </div>
                    )
                })
                for (let i = 0; i < 10; i++) {
                    finalPosts.push(allPosts)
                }
                return finalPosts
            })
            setPopularStories(() => {
                const popularStoriesArray = []
                for (let i = 0; i < posts?.ids.length; i++) {
                    if (!mainStoriesArray.includes(posts?.ids[i])) {
                        popularStoriesArray.push(posts?.ids[i])
                    }
                }
                const slicedStories = popularStoriesArray.sort((a, b) => posts?.entities[b].views - posts?.entities[a].views).slice(0, 10)
                const sortedPosts = slicedStories.sort((a, b) => posts?.entities[b].date - posts?.entities[a].date)
                const allPopularPosts = sortedPosts.map((story) => {
                    let headingEnd
                    const subsHeading = posts?.entities[story].heading.substring(0, 220)
                    if (posts?.entities[story].heading.length > 220) {
                        headingEnd = `${subsHeading}...`
                    } else {
                        headingEnd = subsHeading
                    }
                    let titleEnd
                    const subsTitle = posts?.entities[story].title.substring(0, 120)
                    if (posts?.entities[story].title.length > 120) {
                        titleEnd = `${subsTitle}...`
                    } else {
                        titleEnd = subsTitle
                    }
                    return (
                        <>
                            <div key={posts?.entities[story].id} className="popular-story-container" onClick={() => navigate(`/post/${posts?.entities[story].id}`)}>
                                <img src={posts?.entities[story].thumbnail} alt="popular-story" className="popular-story-thumbnail" />
                                <h4 className="popular-story-title">{titleEnd}</h4>
                                <p className="popular-story-heading">{headingEnd}</p>
                            </div>
                            <hr style={{
                                width: '100%',
                                height: '1px',
                                borderWidth: '0',
                                color: 'gray',
                                backgroundColor: 'black',
                                marginTop: '0px',
                                marginBottom: '0px'
                            }}
                            />
                        </>
                    )
                })
                return allPopularPosts
            })
        }
    }, [isSuccess, posts, mainStoriesAnimaton, navigate])

    useEffect(() => {
        //const interval = setInterval(() => {
        setInterval(() => {
            if (autoScroll) {
                setCount(prevCount => {
                    const newCount = !document.hidden ? prevCount < 195 ? prevCount + 1 : 0 : prevCount
                    return newCount
                })
            }
        }, 3000)

        //return () => clearInterval(interval)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        //const timeInterval = setInterval(() => {
        setInterval(() => {
            setTimeOfLastClick((prevState) => {
                if (!autoScroll && (Date.now() - prevState) >= 4000) {
                    setLeftScroll(0)
                    setAutoScroll(true)
                }
                return prevState
            })
        }, 1000)
        //return () => clearInterval(timeInterval)
    }, [autoScroll, timeOfLastClick])

    useEffect(() => {
        const updateAnimation = () => {
            setMainStoriesAnimation(() => {
                const scrollFactor = (count / 2)
                //const scrollFactor = count
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
        //const prevScrollFactor = count
        const scrollFactor = leftScroll === 0 ? prevScrollFactor > 0 ? prevScrollFactor - 1 : 0 : leftScroll > 96 ? 0 : leftScroll - 1
        //const scrollFactor = count > 96 ? 0 : count - 1
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
        setTimeOfLastClick(Date.now())
        setLeftScroll(scrollFactor)
        setCount((scrollFactor * 2) - 2)
        //setCount(scrollFactor)
    }

    const handleScrollRight = () => {
        setAutoScroll(false)
        const prevScrollFactor = (count / 2)
        //const prevScrollFactor = count
        const scrollFactor = leftScroll === 0 ? prevScrollFactor + 1 : leftScroll > 96 ? 0 : leftScroll + 1
        //const scrollFactor = count > 96 ? 0 : count + 1
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
        setTimeOfLastClick(Date.now())
        setLeftScroll(scrollFactor)
        setCount((scrollFactor * 2) - 2)
        //setCount(scrollFactor)
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
                            <div
                                id="stories-scroll-container"
                                style={{ animation: mainStoriesContainerAnimation }}
                                >
                                {mainStories}
                            </div>
                        </div>
                        <div id="stories-scroll-right" onClick={handleScrollRight} style={{animation: mainStoriesContainerAnimation}}><p>{'>'}</p></div>
                    </section>
                    <div id="down-prompt-container" style={{ opacity: downPromptDisplay.opacity, animation: downPromptDisplay.animation }} onClick={() => {
                        window.scrollTo({ top: popularStoriesRef.current.offsetTop, behavior: 'smooth' })
                    }}><p id="down-prompt">{'<'}</p></div>
                    {/*Popular stories*/}
                    <section id="popular-stories" ref={popularStoriesRef}>
                        <h2 id="popular-stories-title">Historias populares</h2>
                        <div id="popular-stories-container">
                            {popularStories}
                        </div>
                    </section>
                    {/*Explore by Author and Tags*/}
                    <section id="explore">

                    </section>
                </main>
            </div>
            {/*Footer*/}
        </>
    )

}

export default MainPage