import { useGetPageViewsQuery } from "./pageApiSlice"
import LoadingIcon from "./LoadingIcon"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

const PageFooter = () => {

    const navigate = useNavigate()

    const {
        data: views,
        isSuccess,
        isLoading
    } = useGetPageViewsQuery('viewsList', {
        pollingInterval: 600000,
        refetchOnMountOrArgChange: true
    })

    const [developerDisplay, setDeveloperDisplay] = useState('none')

    const [developerMenuLeft, setDeveloperMenuLeft] = useState('')

    const developerOption = useRef()

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {
        return (
            <footer id="page-footer">
                <p id="page-views">Visitas a la página: {views.allViews}</p>
                <p className="footer-option" onClick={() => navigate('/contact')}>Contacto</p>
                <p className="footer-option" onClick={() => navigate('/contact')}>Reportar un problema</p>
                {/*Donate*/}
                {/* <div>
                    <p>Donar</p>
                </div> */}
                <p className="footer-option" onMouseOver={() => {
                    const rect = developerOption.current.getBoundingClientRect()
                    const x = rect.left
                    setDeveloperMenuLeft(`${x - 40}px`)
                    setDeveloperDisplay('grid')
                }} onMouseLeave={() => setDeveloperDisplay('none')} ref={developerOption}>Desarrollado por M.P.</p>
                <div id="developer-info" style={{display: developerDisplay, left: developerMenuLeft}} onMouseOver={() => setDeveloperDisplay('grid')} onMouseLeave={() => setDeveloperDisplay('none')}>
                    <a href="https://github.com/mickeybot-79" target="_blank" rel="noreferrer" className="developer-option">GitHub ↗</a>
                    <a href="https://www.linkedin.com/in/michaelperezvezoli" target="_blank" rel="noreferrer" className="developer-option">LinkedIn ↗</a>
                    <p className="developer-option">michaelperezvezoli@hotmail.com</p>
                </div>
            </footer>
        )
    }

}

export default PageFooter