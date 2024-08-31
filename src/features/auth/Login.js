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

    const handleSubmit = (e) => {
        e.preventDefault()
        // login({ username: loginData.username, password: loginData.password })
        // window.localStorage.setItem('persist', persist)
    }

    return (
        <div id="login-page-container">
            {/* <button id="new-post-back" onClick={() => navigate(-1)}><div>➜</div> Atrás</button> */}
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
                <button id="new-user-button" onClick={(e) => e.preventDefault()}>¿Eres nuevo? <span onClick={() => { }}>Regístrate</span></button>
                <div id="login-options-container">
                    <button id="login-cancel" onClick={(e) => {
                        e.preventDefault()
                        if (currentLocation.pathname === '/') handledisplayingLogin()
                        handleDisplayLogin()
                        // login({ username: loginData.username, password: loginData.password })
                    }}>Cancelar</button>
                    <button id="login-submit" onClick={(e) => handleSubmit(e)}>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Login