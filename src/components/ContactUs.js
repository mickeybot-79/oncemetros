import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSendFeedbackMutation } from "./pageApiSlice"
import { jwtDecode } from "jwt-decode"
import baseUrl from "../baseurl"

const ContactUs = () => {

    const navigate = useNavigate()

    const token = window.localStorage.getItem('token')

    const selectedFeedback = window.sessionStorage.getItem('feedback')

    const [feedbackData, setFeedbackData] = useState({
        type: selectedFeedback,
        content: ''
    })

    const [waiting, setWaiting] = useState('none')

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const [sendFeedback, {
        isLoading
    }] = useSendFeedbackMutation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFeedbackData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        setWaiting('grid')
        const canSave = [feedbackData.type !== '', feedbackData.content !== ''].every(Boolean) && !isLoading
        if (canSave) {
            const result = await sendFeedback({
                userId: token ? jwtDecode(token).UserInfo.id : 'noUser',
                username: token ? jwtDecode(token).UserInfo.username : '',
                type: feedbackData.type,
                content: feedbackData.content
            })
            setWaiting('none')
            setResultMessage((prevState) => {
                return {
                    ...prevState,
                    message: '¡Gracias por tu comentario!',
                    display: 'grid',
                    image: '../../Images/success.gif'
                }
            })
            setTimeout(() => {
                navigate('/')
            }, 2000)
            console.log(result)
        } else {
            if (!feedbackData.content) {
                setWaiting('none')
                setTimeout(() => {
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'Por favor, agrega un comentario.',
                            display: 'grid',
                            confirmButton: 'block',
                        }
                    })
                }, 10)
            }
        }
    }

    return (
        <div id="feedback-container">
            <a href={`${baseUrl.frontend}`} id="new-post-back"><div>➜</div> Volver</a>
            <h3 id="feedback-title">Envíanos tus comentarios</h3>
            <form id="feedback-form">
                <div id="feedback-select-container">
                    <p id="feedback-select-prompt">Tipo de comentario:</p>
                    <select id="feedback-select" defaultValue={feedbackData.type} onChange={(e) => {
                        setFeedbackData((prevState) => {
                            return {
                                ...prevState,
                                type: e.target.value
                            }
                        })}}
                        style={{ fontFamily: 'Impact, Haettenschweiler, `Arial Narrow Bold`, sans-serif', fontSize: '15px' }}>
                        <option value="feedback">Opinión</option>
                        <option value="question">Consulta</option>
                        <option value="suggestion">Sugerencia</option>
                        <option value="problem">Reportar un problema</option>
                    </select>
                </div>
                <textarea 
                    id="feedback-text"
                    name="content"
                    placeholder="Escribe aquí"
                    value={feedbackData.content}
                    onChange={handleChange}
                ></textarea>
                <div id="feedback-options">
                    <button id="feedback-cancel" onClick={(e) => {
                        e.preventDefault()
                        setFeedbackData(() => {
                            return {
                                type: '',
                                content: ''
                            }
                        })
                        navigate('/')
                    }}>Cancelar</button>
                    <button id="feedback-submit" onClick={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}>Enviar</button>
                </div>
            </form>
            <div id="post-result-container" style={{display: resultMessage.display}}>
                <div className="result-container" style={{animation: resultMessage.animation}}>
                    <img src={resultMessage.image} alt="" id="post-result-image"/>
                    <p id="post-result-message">{resultMessage.message}</p>
                    <button className="result-confirm" style={{display: resultMessage.confirmButton}} onClick={() => {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                display: 'none',
                                confirmButton: 'none'
                            }
                        })
                    }}>Aceptar</button>
                </div>
            </div>
            <div style={{
                display: waiting,
                position: 'fixed',
                top: '0',
                width: '100%',
                height: '100%',
                placeContent: 'center',
                placeItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}>
                <div className="loader"></div>
            </div>
        </div>
    )
}

export default ContactUs