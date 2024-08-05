import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const Layout = () => {

    const effectRan = useRef(false)
    const bckgrDisp = window.sessionStorage.getItem('bckgrDisp')

    const [backgroundDisplay, setBackGroundDisplay] = useState({
        display: 'none',
        animation: ''
    })

    useEffect(() => {
        if (effectRan.current === true || bckgrDisp === 'y' || process.env.NODE_ENV !== 'development') {
            setTimeout(() => {
                setBackGroundDisplay({
                    display: 'block',
                    animation: 'background-animation 2s ease-out 1'
                })
            }, 1200);
        } else {
            setBackGroundDisplay({
                display: 'block',
                animation: 'none'
            })
        }

        return () => {
            effectRan.current = true
            window.sessionStorage.setItem('bckgrDisp', 'y')
            setBackGroundDisplay({
                display: 'none',
                animation: 'none'
            })
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="page-container">
                <img src='../Images/background.jpg' alt='background-image' id='background-image' style={{display: backgroundDisplay.display, animation: backgroundDisplay.animation}}/>
                <Outlet />
            </div>
            {/*<PageFooter />*/}
        </>
    )
}
export default Layout