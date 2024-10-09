import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useGetFeedbackQuery } from "./pageApiSlice"
import LoadingIcon from "./LoadingIcon"
import baseUrl from "../baseurl"
import useAuth from "../features/auth/useAuth"

const AllFeedback = () => {

    const navigate = useNavigate()

    const effectRan = useRef(false)

    const logged = window.sessionStorage.getItem('logged')

    const {currentUserId, status} = useAuth()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            if (!logged || (status && status !== 'Admin')) {
                navigate('/')
            }
        }
        return () => effectRan.current = true
    }, [status, currentUserId, logged, navigate])

    const {
        data: feedback,
        isSuccess,
        isLoading
    } = useGetFeedbackQuery('feedbackList', {
        pollingInterval: 600000,
        refetchOnMountOrArgChange: true
    })

    if (isLoading) {
        return (
            <LoadingIcon />
        )
    }

    if (isSuccess) {
        const feedbackElements = [...feedback].sort((a, b) => b.date - a.date).map(item => {
            const feedbackDate = new Date(parseInt(item.date))
            const convertedDate = feedbackDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

            let commentType

            switch (item.type) {
                case 'feedback':
                    commentType = 'Opinión'
                    break
                case 'question':
                    commentType = 'Consulta'
                    break
                case 'suggestion':
                    commentType = 'Sugerencia'
                    break
                default:
                    commentType = 'Problema'
            }
    
            return (
                <div className="feedback-item-container" key={item.date}>
                    <p className="feedback-item-userId">Enviado por: <span className="feedback-item-username" onClick={() => {
                        if (item.userId !== 'noUser') {
                            navigate(`/profile/${item.userId}`)
                        }
                    }}>{item.username}</span></p>
                    <p className="feedback-item-date">Fecha: {convertedDate}</p>
                    <p style={{fontSize: '15px'}}>Tipo de comentario: {commentType}</p>
                    <p className="feedback-item-content">"{item.content}"</p>
                </div>
            )
        })
    
        return (
            <div id="feedback-page-container">
                <a href={`${baseUrl.frontend}/user/${currentUserId}`} id="new-post-back"><div>➜</div> Volver</a>
                <h3 id="feedback-page-title">Comentarios enviados por los usuarios</h3>
                <div id="feedback-elements-container">
                    {feedbackElements}
                </div>
            </div>
        )
    }

}

export default AllFeedback