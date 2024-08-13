import { useEffect, useState } from "react"

const Presentation = ({ presentationDisplay }) => {

    const [presentationHeight, setPresentationHeight] = useState('')

    const [hidePresentation, setHidePresentation] = useState('')

    const [logoPresentation, setLogoPresentation] = useState('')

    useEffect(() => {
        const backgroundAnimationMark = window.sessionStorage.getItem('backgroundAnimation')
        if (!backgroundAnimationMark) {
            setPresentationHeight('100%')
            setLogoPresentation('presentation-animation 0.8s cubic-bezier(0.5, 0.4, 0.35, 1.15) 1')
            setTimeout(() => {
                setHidePresentation('hide-presentation 2s cubic-bezier(.58,.46,.65,1) 1')
                setPresentationHeight('20vh')
            }, 1200)
        } else {
            setPresentationHeight('0px')
        }
    }, [])

    return (
        <section id="presentation-content" style={{ height: presentationHeight, animation: hidePresentation, display: presentationDisplay }}>
            <img src="../Images/logo 3.jpg" alt="logo" id="logo-presentation" style={{ animation: logoPresentation }} />
        </section>
    )
}

export default Presentation