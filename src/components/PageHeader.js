import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const PageHeader = () => {

    const navigate = useNavigate()

    const [displayHeader, setDisplayHeader] = useState('none')

    const [subMenuPosition, setSubMenuPosition] = useState({
        submenu1: '',
        submenu2: '',
        submenu3: '',
        submenu4: '',
        submenu5: ''
    })

    const [displaySubMenu, setDisplaySubMenu] = useState({
        submenu1: 'none',
        submenu2: 'none',
        submenu3: 'none',
        submenu4: 'none',
        submenu5: 'none'
    })

    const subMenu1 = useRef()
    const subMenu2 = useRef()
    const subMenu3 = useRef()
    const subMenu4 = useRef()
    const subMenu5 = useRef()

    const [subMenuTop, setSubMenuTop] = useState('')

    useEffect(() => {
        const backgroundAnimationMark = window.sessionStorage.getItem('backgroundAnimation')
        if (!backgroundAnimationMark) {
            setTimeout(() => {
                setDisplayHeader('grid')
            }, 3195)
            //window.sessionStorage.setItem('backgroundAnimation', 'y')
        } else {
            setDisplayHeader('grid')
        }

        //return () => window.sessionStorage.removeItem('backgroundAnimation')
    }, [])

    const displaySubmenu1 = () => {
        const rect = subMenu1.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuPosition((prevState) => {
            return {
                ...prevState,
                submenu1: `${x}px`
            }
        })
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu1: 'block'
            }
        })
        setSubMenuTop(() => {
            const headerElement = document.getElementById('header-container')
            const rect = headerElement.getBoundingClientRect()
            return `${rect.bottom - 20}px`
        })
    }

    const displaySubmenu2 = () => {
        const rect = subMenu2.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuPosition((prevState) => {
            return {
                ...prevState,
                submenu2: `${x}px`
            }
        })
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu2: 'block'
            }
        })
        setSubMenuTop(() => {
            const headerElement = document.getElementById('header-container')
            const rect = headerElement.getBoundingClientRect()
            return `${rect.bottom - 20}px`
        })
    }

    const displaySubmenu3 = () => {
        const rect = subMenu3.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuPosition((prevState) => {
            return {
                ...prevState,
                submenu3: `${x}px`
            }
        })
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu3: 'block'
            }
        })
        setSubMenuTop(() => {
            const headerElement = document.getElementById('header-container')
            const rect = headerElement.getBoundingClientRect()
            return `${rect.bottom - 20}px`
        })
    }

    const displaySubmenu4 = () => {
        const rect = subMenu4.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuPosition((prevState) => {
            return {
                ...prevState,
                submenu4: `${x}px`
            }
        })
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu4: 'block'
            }
        })
        setSubMenuTop(() => {
            const headerElement = document.getElementById('header-container')
            const rect = headerElement.getBoundingClientRect()
            return `${rect.bottom - 20}px`
        })
    }

    const displaySubmenu5 = () => {
        const rect = subMenu5.current.getBoundingClientRect()
        const x = rect.left
        setSubMenuPosition((prevState) => {
            return {
                ...prevState,
                submenu5: `${x}px`
            }
        })
        setDisplaySubMenu((prevState) => {
            return {
                ...prevState,
                submenu5: 'block'
            }
        })
        setSubMenuTop(() => {
            const headerElement = document.getElementById('header-container')
            const rect = headerElement.getBoundingClientRect()
            return `${rect.bottom - 20}px`
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
                <img src="../Images/logo.jpg" alt="logo" id="header-logo" />
                <ul id="main-menu-options">
                    <li className="menu-item" onClick={() => navigate('/')}>Inicio</li>
                    <li className="menu-item" ref={subMenu1} onMouseOver={displaySubmenu1} onMouseLeave={handleDisplaySubMenu1}>Fútbol Nacional</li>
                    <li className="menu-item" ref={subMenu2} onMouseOver={displaySubmenu2} onMouseLeave={handleDisplaySubMenu2}>Fútbol Internacional</li>
                    <li className="menu-item" ref={subMenu3} onMouseOver={displaySubmenu3} onMouseLeave={handleDisplaySubMenu3}>Competiciones Europeas</li>
                    <li className="menu-item" ref={subMenu4} onMouseOver={displaySubmenu4} onMouseLeave={handleDisplaySubMenu4}>Competiciones Internacionales</li>
                    <li className="menu-item" ref={subMenu5} onMouseOver={displaySubmenu5} onMouseLeave={handleDisplaySubMenu5}>Historia de los mundiales</li>
                </ul>
            </header>
            <ul id="futbol-nacional-options" onMouseOver={displaySubmenu1} onMouseLeave={handleDisplaySubMenu1} style={{display: displaySubMenu.submenu1, left: subMenuPosition.submenu1, top: subMenuTop}}>
                <li className="submenu-option">LaLiga Ea Sports</li>
                <li className="submenu-option">LaLiga Hypermotion</li>
                <li className="submenu-option">Primera RFEF</li>
                <li className="submenu-option">Segunda RFEF</li>
                <li className="submenu-option">Tercera RFEF</li>   
                <li className="submenu-option">Copa del Rey</li>
                <li className="submenu-option">Supercopa de España</li>
            </ul>
            <ul id="futbot-internacional-options" onMouseOver={displaySubmenu2} onMouseLeave={handleDisplaySubMenu2} style={{display: displaySubMenu.submenu2, left: subMenuPosition.submenu2, top: subMenuTop}}>
                <li className="submenu-option">Premier League</li>
                <li className="submenu-option">Bundesliga</li>
                <li className="submenu-option">Ligue 1</li>
                <li className="submenu-option">Serie A</li>
                <li className="submenu-option">Primeira Liga</li>
                <li className="submenu-option">MLS</li>
            </ul>
            <ul id="competiciones-europeas-options" onMouseOver={displaySubmenu3} onMouseLeave={handleDisplaySubMenu3} style={{display: displaySubMenu.submenu3, left: subMenuPosition.submenu3, top: subMenuTop}}>
                <li className="submenu-option">Champsions League</li>
                <li className="submenu-option">Europa League</li>
                <li className="submenu-option">Conference League</li>
            </ul>
            <ul id="competiciones-internacionales-options" onMouseOver={displaySubmenu4} onMouseLeave={handleDisplaySubMenu4} style={{display: displaySubMenu.submenu4, left: subMenuPosition.submenu4, top: subMenuTop}}>
                <li className="submenu-option">Eurocopa</li>
                <li className="submenu-option">Copa América</li>
                <li className="submenu-option">Nations League</li>
            </ul>
            <ul id="historia-de-los-mundiales-options" onMouseOver={displaySubmenu5} onMouseLeave={handleDisplaySubMenu5} style={{display: displaySubMenu.submenu5, left: subMenuPosition.submenu5, top: subMenuTop}}>
                <li className="submenu-option">Mundial Uruguay 1930</li>
                <li className="submenu-option">Mundial Qatar 2022</li>
            </ul>
        </>
    )

}

export default PageHeader