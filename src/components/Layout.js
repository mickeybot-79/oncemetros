import { Outlet } from 'react-router-dom'

const Layout = () => {

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