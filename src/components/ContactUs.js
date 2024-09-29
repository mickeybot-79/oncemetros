import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSendFeedbackMutation } from "./pageApiSlice"
import { jwtDecode } from "jwt-decode"

const ContactUs = () => {

    const navigate = useNavigate()

    const token = window.localStorage.getItem('token')

    const [feedbackData, setFeedbackData] = useState({
        type: '',
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

    const [sendFeedback] = useSendFeedbackMutation()

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
        const result = await sendFeedback({
            userId: token ? jwtDecode(token).UserInfo.id : 'noUser',
            type: feedbackData.type,
            content: feedbackData.content
        })
        console.log(result)
    }

    return (
        <div id="feedback-container">
            <h3 id="feedback-title">Enviar comentarios</h3>
            <form id="feedback-form">
                <p id="feedback-select-prompt">Por favor, selecciona un tipo de comentario:</p>
                <select id="feedback-select" defaultValue="" onChange={(e) => {
                        setFeedbackData((prevState) => {
                            return {
                                ...prevState,
                                type: e.target.value
                            }
                        })
                    }}
                    style={{fontFamily: 'Impact, Haettenschweiler, `Arial Narrow Bold`, sans-serif', fontSize: '15px'}}>
                    <option value="" disabled hidden id='hidden' readOnly>Seleccionar</option>
                    <option>Consulta</option>
                    <option>Sugerencia</option>
                    <option>Comentario</option>
                    <option>Reportar un problema</option>
                </select>
                <textarea 
                    id="feedback-text"
                    name="content"
                    placeholder="Escribe aquí"
                    value={feedbackData.content}
                    onChange={handleChange}
                ></textarea>
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