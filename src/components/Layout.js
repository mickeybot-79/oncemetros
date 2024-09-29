import { Outlet } from 'react-router-dom'

const Layout = () => {

    const logged = window.sessionStorage.getItem('logged')
    const token = window.localStorage.getItem('token')

    if (token && (!logged || logged === 'n')) {
        setTimeout(() => {
            window.localStorage.removeItem('token')
        }, 100)
    }

    return (
        <>
            <div className="page-container">
                <img src='../Images/background.jpg' alt='background-image' id='background-image' />
                <Outlet />
            </div>
        </>
    )
}
export default Layout