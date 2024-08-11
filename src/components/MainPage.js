import { useEffect, useState } from "react"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import PageHeader from "./PageHeader"
import { useNavigate } from "react-router-dom"

const MainPage = () => {

    const navigate = useNavigate()

    const {
        data: posts,
        isSuccess
    } = useGetPostsQuery('postsList', {
        pollingInterval: 60000
    })

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

    const [count, setCount] = useState(-2)

    const [autoScroll, setAutoScroll] = useState(true)

    const [mainStoriesContainerAnimation, setMainStoriesContainerAnimation] = useState('stories-animation 1s linear 1')

    const [logoPresentation, setLogoPresentation] = useState('')

    useEffect(() => {
        const backgroundAnimationMark = window.sessionStorage.getItem('backgroundAnimation')
        if (!backgroundAnimationMark) {
            setPresentationHeight('100%')
            setTimeout(() => {
                setLogoPresentation('presentation-animation 0.8s cubic-bezier(0.5, 0.4, 0.35, 1.15) 1')
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

            window.sessionStorage.setItem('backgroundAnimation', 'y')
        } else {
            setCount(0)
            setPresentationDisplay('none')
            setHidePresentation('')
            setPresentationHeight('0px')
            setMainStoriesContainerAnimation('')
            setBackGroundAnimation(() => {
                return {
                    animation: '',
                    display: 'none'
                }
            })
        }
        setTimeout(() => {
            setDownPromptDisplay({
                display: 'block',
                animation: 'down-prompt-display 0.3s linear 1'
            })
        }, 5000)

        //return () => window.sessionStorage.removeItem('backgroundAnimation')
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setMainStories(() => {
                const finalPosts = []
                const allPosts = posts?.ids.map((story) => {
                    let headingEnd
                    const subsHeading = posts?.entities[story].heading.substring(0, 100)
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
    }, [isSuccess, posts, mainStoriesAnimaton, navigate])

    useEffect(() => {
        if (autoScroll) {
            setInterval(() => {
                setCount(prevCount => {
                    const newCount = !document.hidden ? prevCount < 1195 ? prevCount + 1 : 0 : prevCount
                    return newCount
                })
            }, 3000)
        }
        // eslint-disable-next-line
    }, [])

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

    useEffect(() => {
        if (!autoScroll) {
            setTimeout(() => {
                setLeftScroll(0)
                setAutoScroll(true)
            }, 4000)
        }
        //eslint-disable-next-line
    }, [autoScroll])

    const handleScrollLeft = () => {
        setAutoScroll(false)
        const prevScrollFactor = (count / 2)
        const scrollFactor = leftScroll === 0 ? prevScrollFactor > 0 ? prevScrollFactor - 1 : 0 : leftScroll - 1
        setLeftScroll(scrollFactor)
        setCount((scrollFactor * 2) - 2)
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor * 321}px)`
            }
        })
    }

    const handleScrollRight = () => {
        setAutoScroll(false)
        const prevScrollFactor = (count / 2)
        const scrollFactor = leftScroll === 0 ? prevScrollFactor > 0 ? prevScrollFactor + 1 : prevScrollFactor + 2 : leftScroll + 1
        setLeftScroll(scrollFactor)
        setCount((scrollFactor * 2) - 2)
        setMainStoriesAnimation(() => {
            return {
                transition: '0.5s',
                transform: `translateX(-${scrollFactor  * 321}px)`
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
                    <img src="../Images/logo.jpg" alt="logo" id="logo-presentation" style={{animation: logoPresentation}}/>
                </section>
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