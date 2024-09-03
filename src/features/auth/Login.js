import { useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useLocation, useNavigate } from "react-router-dom"

const Login = ({ handleDisplayLogin, loginAnimation, handledisplayingLogin }) => {

    const currentLocation = useLocation()

    const navigate = useNavigate()

    const [login] = useLoginMutation()

    const [persist, setPersist] = useState(window.localStorage.getItem('persist') || 'true')

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [waiting, setWaiting] = useState('none')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setWaiting('grid')
        await login({ username: loginData.username, password: loginData.password })
        setWaiting('none')
        if (currentLocation.pathname === '/') handledisplayingLogin()
        handleDisplayLogin()
        window.localStorage.setItem('persist', persist)
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
                    <button id="login-cancel" onClick={(e) => {
                        e.preventDefault()
                        if (currentLocation.pathname === '/') handledisplayingLogin()
                        handleDisplayLogin()
                    }}>Cancelar</button>
                    <button id="login-submit" onClick={(e) => handleSubmit(e)}>Enviar</button>
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
        </div>
    )
}

export default Login