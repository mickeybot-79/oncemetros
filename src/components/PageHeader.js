import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const PageHeader = () => {

    const navigate = useNavigate()

    const [displayHeader, setDisplayHeader] = useState('none')

    const [displaySubMenu, setDisplaySubMenu] = useState({
        submenu1: 'none',
        submenu2: 'none',
        submenu3: 'none',
        submenu4: 'none',
        submenu5: 'none'
    })

    const [subMenuLeft, setSubMenuLeft] = useState('')

    const [subMenuTop, setSubMenuTop] = useState('')

    const subMenu1 = useRef()
    const subMenu2 = useRef()
    const subMenu3 = useRef()
    const subMenu4 = useRef()
    const subMenu5 = useRef()

    useEffect(() => {
        const backgroundAnimationMark = window.sessionStorage.getItem('backgroundAnimation')
        if (!backgroundAnimationMark) {
            setTimeout(() => {
                setDisplayHeader('grid')
            }, 3195)
        } else {
            setDisplayHeader('grid')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setSubMenuTop(() => {
                const headerElement = document.getElementById('header-container')
                const rect = headerElement.getBoundingClientRect()
                return `${rect.bottom - 20}px`
            })
        })
    }, [displayHeader])

    const displaySubmenu1 = () => {
        const rect = subMenu1.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuLeft(`${x}px`)
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu1: 'block'
            }
        })
    }

    const displaySubmenu2 = () => {
        const rect = subMenu2.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuLeft(`${x}px`)
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu2: 'block'
            }
        })
    }

    const displaySubmenu3 = () => {
        const rect = subMenu3.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuLeft(`${x}px`)
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu3: 'block'
            }
        })
    }

    const displaySubmenu4 = () => {
        const rect = subMenu4.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuLeft(`${x}px`)
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu4: 'block'
            }
        })
    }

    const displaySubmenu5 = () => {
        const rect = subMenu5.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuLeft(`${x}px`)
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu5: 'block'
            }
        })
    }

    const handleDisplaySubMenu1 = () => {
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu1: 'none'
            }
        })
    }

    const handleDisplaySubMenu2 = () => {
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu2: 'none'
            }
        })
    }

    const handleDisplaySubMenu3 = () => {
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu3: 'none'
            }
        })
    }

    const handleDisplaySubMenu4 = () => {
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu4: 'none'
            }
        })
    }

    const handleDisplaySubMenu5 = () => {
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu5: 'none'
            }
        })
    }

    return (
        <>
            <header id="header-container" style={{ display: displayHeader }}>
                <img src="../Images/logo 3.jpg" alt="logo" id="header-logo" />
                <ul id="main-menu-options">
                    <li className="menu-item" onClick={() => navigate('/')}>Inicio</li>
                    <li className="menu-item" ref={subMenu1} onMouseOver={displaySubmenu1} onMouseLeave={handleDisplaySubMenu1}>Fútbol Nacional</li>
                    <li className="menu-item" ref={subMenu2} onMouseOver={displaySubmenu2} onMouseLeave={handleDisplaySubMenu2}>Fútbol Internacional</li>
                    <li className="menu-item" ref={subMenu3} onMouseOver={displaySubmenu3} onMouseLeave={handleDisplaySubMenu3}>Competiciones Europeas</li>
                    <li className="menu-item" ref={subMenu4} onMouseOver={displaySubmenu4} onMouseLeave={handleDisplaySubMenu4}>Competiciones Internacionales</li>
                    <li className="menu-item" ref={subMenu5} onMouseOver={displaySubmenu5} onMouseLeave={handleDisplaySubMenu5}>Historia de los mundiales</li>
                </ul>
            </header>
            <ul id="futbol-nacional-options" onMouseOver={displaySubmenu1} onMouseLeave={handleDisplaySubMenu1} style={{display: displaySubMenu.submenu1, left: subMenuLeft, top: subMenuTop}}>
                <li className="submenu-option" onClick={() => navigate('/tags/LaLiga EA Sports')}>LaLiga EA Sports</li>
                <li className="submenu-option" onClick={() => navigate('/tags/LaLiga Hypermotion')}>LaLiga Hypermotion</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Primera RFEF')}>Primera RFEF</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Segunda RFEF')}>Segunda RFEF</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Tercera RFEF')}>Tercera RFEF</li>   
                <li className="submenu-option" onClick={() => navigate('/tags/Copa del rey')}>Copa del rey</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Supercopa de España')}>Supercopa de España</li>
            </ul>
            <ul id="futbot-internacional-options" onMouseOver={displaySubmenu2} onMouseLeave={handleDisplaySubMenu2} style={{display: displaySubMenu.submenu2, left: subMenuLeft, top: subMenuTop}}>
                <li className="submenu-option" onClick={() => navigate('/tags/Premier League')}>Premier League</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Bundesliga')}>Bundesliga</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Ligue 1')}>Ligue 1</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Serie A')}>Serie A</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Primeira Liga de Portugal')}>Primeira Liga de Portugal</li>
                <li className="submenu-option" onClick={() => navigate('/tags/MLS')}>MLS</li>
            </ul>
            <ul id="competiciones-europeas-options" onMouseOver={displaySubmenu3} onMouseLeave={handleDisplaySubMenu3} style={{display: displaySubMenu.submenu3, left: subMenuLeft, top: subMenuTop}}>
                <li className="submenu-option" onClick={() => navigate('/tags/Champions League')}>Champions League</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Europa League')}>Europa League</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Conference League')}>Conference League</li>
            </ul>
            <ul id="competiciones-internacionales-options" onMouseOver={displaySubmenu4} onMouseLeave={handleDisplaySubMenu4} style={{display: displaySubMenu.submenu4, left: subMenuLeft, top: subMenuTop}}>
                <li className="submenu-option" onClick={() => navigate('/tags/Eurocopa')}>Eurocopa</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Copa América')}>Copa América</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Nations League')}>Nations League</li>
            </ul>
            <ul id="historia-de-los-mundiales-options" onMouseOver={displaySubmenu5} onMouseLeave={handleDisplaySubMenu5} style={{display: displaySubMenu.submenu5, left: subMenuLeft, top: subMenuTop}}>
                <li className="submenu-option" onClick={() => navigate('/tags/Mundial Uruguay 1930')}>Mundial Uruguay 1930</li>
                <li className="submenu-option" onClick={() => navigate('/tags/Mundial Qatar 2022')}>Mundial Qatar 2022</li>
            </ul>
        </>
    )

}

export default PageHeader