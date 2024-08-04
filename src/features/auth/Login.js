import { useState } from "react"
import { useLoginMutation } from "./authApiSlice"

const Login = () => {

    const [login] = useLoginMutation()

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    return (
        <>
            <form>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={loginData.username}
                    onChange={(e) => setLoginData((prevState) => {
                        return {
                            ...prevState, 
                            username: e.target.value
                        }
                    })}
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prevState) => {
                        return {
                            ...prevState, 
                            password: e.target.value
                        }
                    })}
                />
                <label htmlFor="remember-login">Recordar usuario</label>
                <input
                    type="radio"
                    id="remember-login"
                />
                <button id="password-reset">¿Olvidaste la contraseña?</button>
                <button id="submit" onClick={() => login({username: loginData.username, password: loginData.password})}>Enviar</button>
            </form>
            <a href="...">Volver al Inicio</a>
        </>
    )
}

export default Login