import { useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const Login = ({ handleDisplayLogin, loginAnimation, handleDisplayingLogin }) => {

    const currentLocation = useLocation()

    const navigate = useNavigate()

    const isTemp = window.localStorage.getItem('isTemp')

    const [login] = useLoginMutation()

    const [persist, setPersist] = useState(window.localStorage.getItem('persist') || 'true')

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [waiting, setWaiting] = useState('none')

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setWaiting('grid')
        const result = await login({ username: loginData.username, password: loginData.password })
        if (result?.error) {
            setWaiting('none')
            setResultMessage((prevState) => {
                return {
                    ...prevState,
                    message: `${result?.error?.data?.error}`,
                    display: 'grid',
                    confirmButton: 'block',
                }
            })
        } else {
            setWaiting('none')
            const userId = jwtDecode(result?.data?.accessToken).UserInfo.id
            setResultMessage((prevState) => {
                return {
                    ...prevState,
                    message: 'Éxito',
                    display: 'grid',
                    image: '../../Images/success.gif'
                }
            })
            setTimeout(() => {
                if (currentLocation.pathname === '/') handleDisplayingLogin()
                handleDisplayLogin()
                window.localStorage.setItem('persist', persist)
                if (isTemp) window.localStorage.removeItem('isTemp')
                navigate(`/user/${userId}`)
            }, 2000)
        }
    }

    return (
        <div id="login-page-container">
            <form id="login-form" style={{animation: loginAnimation}}>
                <h3 id="login-title">Iniciar Sesión</h3>
                <label htmlFor="username" className="login-label">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Usuario"
                    className="login-input"
                    value={loginData.username}
                    onChange={(e) => setLoginData((prevState) => {
                        return {
                            ...prevState,
                            username: e.target.value
                        }
                    })}
                />
                <label htmlFor="password" className="login-label">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prevState) => {
                        return {
                            ...prevState,
                            password: e.target.value
                        }
                    })}
                />
                <button id="password-reset-option" onClick={(e) => {
                    e.preventDefault()
                }}>¿Olvidaste tu contraseña?</button>
                <div>
                    <label htmlFor="remember-login" className="login-label">Recordar usuario</label>
                    <input
                        type="radio"
                        id="remember-login"
                        checked={persist === 'true' ? true : false}
                        onClick={() => {
                            setPersist((prevState) => {
                                return prevState === 'true' ? 'false' : 'true'
                            })
                        }}
                        onChange={() => window.localStorage.setItem('persist', persist)}
                    />
                </div>
                <button id="new-user-button" onClick={(e) => e.preventDefault()}>¿Eres nuevo? <span onClick={() => navigate('/users/new')}>Regístrate</span></button>
                <div id="login-options-container">
                    <button 
                    id="login-cancel" 
                    onClick={(e) => {
                        e.preventDefault()
                        if (currentLocation.pathname === '/') handleDisplayingLogin()
                        handleDisplayLogin()
                    }}>Cancelar</button>
                    <button 
                    id="login-submit" 
                    disabled={loginData.username !== '' && loginData.password !== '' ? false : true}
                    onClick={(e) => handleSubmit(e)}>Enviar</button>
                </div>
            </form>
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
        </div>
    )
}

export default Login