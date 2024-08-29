import { useEffect, useRef, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import { useNavigate } from "react-router-dom"
import Presentation from "./Presentation"
import PageHeader from "./PageHeader"

const MainPage = () => {

    const navigate = useNavigate()

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 600000
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

    const [count, setCount] = useState(-1)

    const [autoScroll, setAutoScroll] = useState(true)

    const [mainStoriesContainerAnimation, setMainStoriesContainerAnimation] = useState('stories-animation 1.2s linear 1')

    const [timeOfLastClick, setTimeOfLastClick] = useState(0)

    const popularStoriesRef = useRef()

    const exploreRef = useRef()

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
            }, 3800)

            setTimeout(() => {
                setDownPromptDisplay({
                    opacity: '1',
                    animation: 'down-prompt-display 0.3s linear 1'
                })
            }, 7000)

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
                    const subsHeading = posts?.entities[story].heading.substring(0, 90)
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
                        <div key={story} className="main-story" style={{transform: mainStoriesAnimaton.transform, transition: mainStoriesAnimaton.transition}} onClick={() => navigate(`/post/${story}`)}>
                            <img src={posts?.entities[story].thumbnail} alt="main-story" className="story-thumbnail" />
                            <div id="title-heading-container">
                                <h4 className="story-title">{titleEnd}</h4>
                                <p className="story-heading">{headingEnd}</p>
                            </div>
                        </div>
                    )
                })
                for (let i = 0; i < 5; i++) {
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
                const slicedStories = popularStoriesArray.sort((a, b) => posts?.entities[b].views - posts?.entities[a].views).slice(3, 10)
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
                    let itemClass
                    if (sortedPosts.indexOf(story) % 2 === 1) {
                        itemClass = "popular-story-container-odd"
                    } else {
                        itemClass = "popular-story-container"
                    }
                    return (
                        <div key={story}>
                            <div className={itemClass} onClick={() => navigate(`/post/${posts?.entities[story].id}`)}>
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
                            }} />
                        </div>
                    )
                })
                return allPopularPosts
            })
        }
    }, [isSuccess, posts, mainStoriesAnimaton, navigate])

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoScroll) {
                setCount(prevCount => {
                    return !document.hidden ? prevCount < 47 ? prevCount + 1 : 0 : prevCount
                })
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [autoScroll])

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTimeOfLastClick((prevState) => {
                if (!autoScroll && (Date.now() - prevState) >= 1000) {
                    setAutoScroll(true)
                }
                return prevState
            })
        }, 1000)

        return () => clearInterval(timeInterval)
    }, [autoScroll, timeOfLastClick])

    useEffect(() => {
        if (autoScroll) {
            setMainStoriesAnimation(() => {
                return {
                    transition: '1.5s',
                    transform: `translateX(-${count * 321}px)`
                }
            })
        }
    }, [count, autoScroll])

    const handleScrollLeft = () => {
        setAutoScroll(false)
        const scrollFactor = count > 46 ? 0 : count - 1
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
        setTimeOfLastClick(Date.now())
        setCount(scrollFactor)
    }

    const handleScrollRight = () => {
        setAutoScroll(false)
        const scrollFactor = count > 46 ? 0 : count + 1
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
        setTimeOfLastClick(Date.now())
        setCount(scrollFactor)
    }

    return (
        <>
            <div id="background-div" style={{display: backgroundAnimation.display, animation: backgroundAnimation.animation}}></div>
            <Presentation presentationDisplay={presentationDisplay}/>
            <PageHeader />
            <div id="main-page-container">
                <main style={{ display: presentationDisplay === 'none' ? 'grid' : 'none' }}>
                    <section id="main-stories">
                        <div id="stories-scroll-left" onClick={handleScrollLeft} style={{animation: mainStoriesContainerAnimation}}><p>{'<'}</p></div>
                        <div id="main-stories-container" style={{animation: mainStoriesContainerAnimation}}>
                            <div id="stories-scroll-container" style={{ animation: mainStoriesContainerAnimation }}>
                                {mainStories}
                            </div>
                        </div>
                        <div id="stories-scroll-right" onClick={handleScrollRight} style={{animation: mainStoriesContainerAnimation}}><p>{'>'}</p></div>
                    </section>
                    <div
                        className="down-prompt-container"
                        style={{ opacity: downPromptDisplay.opacity, animation: downPromptDisplay.animation }}
                        onClick={() => {
                            window.scrollTo({ top: popularStoriesRef.current.offsetTop + 50, behavior: 'smooth' })
                        }}>
                        <p className="down-prompt">{'<'}</p>
                    </div>
                    <section id="popular-stories" ref={popularStoriesRef}>
                        {/* <div id="popular-background-container">
                            <img src="../Images/football-1331838_1280.jpg" alt="background" id="popular-stories-background"/>
                        </div> */}
                        <h2 id="popular-stories-title">Historias Destacadas</h2>
                        <div id="popular-stories-container">
                            {popularStories}
                        </div>
                    </section>
                    <section id="explore" ref={exploreRef}>
                        <h2 id="explore-title">Explorar</h2>
                        <div id="explore-authors-container">
                            <h3 id="explore-authors-title">Autores</h3>
                            <ul id="authors-list">
                                <li className="authors-list-item" onClick={() => navigate('/posts/Matías Vázquez')}>Matías Vázquez</li>
                                <li className="authors-list-item" onClick={() => navigate('/posts/Antonio Peñalver')}>Antonio Peñalver</li>
                                <li className="authors-list-item" onClick={() => navigate('/posts/Aymen Smaili Miri')}>Aymen Smaili Miri</li>
                                <li className="authors-list-item" onClick={() => navigate('/posts/Martín')}>Martín</li>
                                <li className="authors-list-item" onClick={() => navigate('/posts/Izan Villaverde')}>Izan Villaverde</li>
                                <li className="authors-list-item" onClick={() => navigate('/posts/Diego Andrés Cano López')}>Diego Andrés Cano López</li>
                                <li className="authors-list-item" onClick={() => navigate('/posts/Jesús Ascó')}>Jesús Ascó</li>
                            </ul>
                        </div>
                        <div id="explore-tags-container">
                            <h3 id="explore-tags-title">Etiquetas</h3>
                            <ul id="tags-list">
                                <li className="tags-list-item" onClick={() => navigate('/tags/LaLiga EA Sports')}>LaLiga EA Sports</li>
                                <li className="tags-list-item" onClick={() => navigate('/tags/Copa del rey')}>Copa del rey</li>
                                <li className="tags-list-item" onClick={() => navigate('/tags/Premier League')}>Premier League</li>
                                <li className="tags-list-item" onClick={() => navigate('/tags/Champions League')}>Champions League</li>
                                <li className="tags-list-item" onClick={() => navigate('/tags/Europa League')}>Europa League</li>
                                <li className="tags-list-item" onClick={() => navigate('/tags/Conference League')}>Conference League</li>
                                <li className="tags-list-item" onClick={() => navigate('/tags')}>Más...</li>
                            </ul>
                        </div>
                    </section>
                    <div
                        className="down-prompt-container"
                        style={{ opacity: downPromptDisplay.opacity, animation: downPromptDisplay.animation, marginBottom: '100px' }}
                        onClick={() => {
                            window.scrollTo({top: 0, behavior: 'smooth' })
                        }}>
                        <p className="down-prompt">{'>'}</p>
                    </div>
                </main>
            </div>
            {/*Footer*/}
        </>
    )

}

export default MainPage