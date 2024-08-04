import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Layout = () => {

    const [backgroundDisplay, setBackGroundDisplay] = useState({
        display: 'none',
        animation: ''
    })

    useEffect(() => {
        // window.sessionStorage.setItem('bckgrDisp', 'y')
        const bckgrDisp = window.sessionStorage.getItem('bckgrDisp')
        if (bckgrDisp === 'y' || process.env.NODE_ENV !== 'development') {
            setTimeout(() => {
                setBackGroundDisplay({
                    display: 'block',
                    animation: 'background-animation 2s ease-out 1'
                })
            }, 1200);
        } else {
            setBackGroundDisplay({
                display: 'none',
                animation: ''
            })
        }

        return () => {
            window.sessionStorage.setItem('bckgrDisp', 'n')
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