import { Outlet } from 'react-router-dom'
import PageHeader from './PageHeader'
import { useEffect, useState } from 'react'

const Layout = () => {

    const [backgroundDisplay, setBackGroundDisplay] = useState({
        display: 'none',
        animation: ''
    })

    useEffect(() => {
        setTimeout(() => {
            setBackGroundDisplay({
                display: 'block',
                animation: 'background-animation 2s ease-out 1'
            })
        }, 1200);
    }, [])
    return (
        <>
            <div className="page-container">
                <img src='../Images/background.jpg' alt='background-image' id='background-image' style={{display: backgroundDisplay.display, animation: backgroundDisplay.animation}}/>
                <PageHeader />
                <Outlet />
            </div>
            {/*<PageFooter />*/}
        </>
    )
}
export default Layout