import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    useEffect(() => {
        setTimeout(() => {
            window.sessionStorage.setItem('backgroundAnimation', 'y')
        }, 1000)

        return () => window.sessionStorage.removeItem('backgroundAnimation')
    }, [])

    return (
        <>
            <div className="page-container">
                <img src='../Images/background.jpg' alt='background-image' id='background-image' />
                <Outlet />
            </div>
            {/*<PageFooter />*/}
        </>
    )
}
export default Layout