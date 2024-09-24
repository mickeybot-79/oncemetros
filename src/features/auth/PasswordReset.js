//import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useUpdateUserDataMutation } from "./authApiSlice"

const PasswordReset = () => {

    const { token } = useParams()

    //const userId = token ? jwtDecode(token).userId : ''

    const [updateUserData] = useUpdateUserDataMutation()

    const [userData, setUserData] = useState({
        token,
        password: '',
        confirmPassword: ''
    })

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        const validPassword = userData.password !== '' && userData.confirmPassword !== '' && userData.password.length === userData.confirmPassword.length && userData.password !== userData.confirmPassword
        if (validPassword) {
            // const result = await updateUserData({userData})
            // console.log(result)
        } else {
            setResultMessage((prevState) => {
                return {
                    ...prevState,
                    message: 'Las contraseñas no coinciden',
                    display: 'grid',
                    confirmButton: 'block',
                }
            })
        }
    }

    return (
        <div>
            <p>Por favor, ingresa una nueva contraseña</p>
            <input
                id="reset-new-password"
                name="password"
                type="password"
                value={userData.password}
                placeholder="Contraseña"
                onChange={handleChange}
                />
            <p>Confirma la nueva contraseña</p>
            <input 
                id="reset-new-confirmPassword"
                name="confirmPassword"
                type="password"
                value={userData.confirmPassword}
                placeholder="Reingresa la contraseña"
                onChange={handleChange}
            />
            <p style={{display: userData.password !== '' && userData.confirmPassword !== '' && userData.password.length === userData.confirmPassword.length && userData.password !== userData.confirmPassword ? 'block': 'none'}}>Las contraseñas no coinciden</p>
            <button onClick={handleSubmit}>Enviar</button>
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

export default PasswordReset