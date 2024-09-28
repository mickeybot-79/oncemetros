import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUpdateUserPasswordMutation, useVerifyResetTokenMutation } from "./authApiSlice"
import { jwtDecode } from "jwt-decode"
import LoadingIcon from "../../components/LoadingIcon"

const PasswordReset = () => {

    const { token } = useParams()

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const [verifyResetToken] = useVerifyResetTokenMutation()

    const [loading, setLoading] = useState(true)

    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchResult = async () => {
            const result = await verifyResetToken(token)
            if (result?.data?.result !== 'Success') {
                //console.log(result)
                setIsError(true)
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'Solicitud expirada, por favor vuelve a intentar.',
                        display: 'grid',
                    }
                })
            } else {
                //console.log(result)
                setLoading(false)
            }
        }
        fetchResult()
    }, [token, verifyResetToken])

    const navigate = useNavigate()

    const [updateUserPassword] = useUpdateUserPasswordMutation()

    const username = token ? jwtDecode(token).username : ''

    const [userData, setUserData] = useState({
        token,
        password: '',
        confirmPassword: ''
    })

    const [waiting, setWaiting] = useState('none')

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        setWaiting('grid')
        const validPassword = userData.password !== '' && userData.confirmPassword !== '' && userData.password.length === userData.confirmPassword.length && userData.password === userData.confirmPassword
        if (validPassword) {
            const result = await updateUserPassword({ ...userData })
            console.log(result)
            if (result?.data) {
                setWaiting('none')
                window.localStorage.setItem('token', result?.data?.accessToken)
                const decodedToken = jwtDecode(result?.data?.accessToken).UserInfo
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'Contraseña actualizada correctamente',
                        display: 'grid',
                        image: '../../Images/success.gif'
                    }
                })
                setTimeout(() => {
                    navigate(`/user/${decodedToken.id}`)
                }, 2000)
            }
        } else {
            setWaiting('none')
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

    if (loading) {
        if (isError) {
            return (
                <>
                    <LoadingIcon />
                    <div id="post-result-container" style={{ display: resultMessage.display }}>
                        <div className="result-container" style={{ animation: resultMessage.animation }}>
                            <img src={resultMessage.image} alt="" id="post-result-image" />
                            <p id="post-result-message">{resultMessage.message}</p>
                            <button className="result-confirm" style={{ display: resultMessage.confirmButton }} onClick={() => {
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
                </>
            )
        } else {
            return (
                <LoadingIcon />
            )
        }
    } else {
        console.log('loading:', loading)
        console.log('isError:', isError)
        return (
            <div id="reset-page-container">
                <div id="reset-page-form">
                    <p id="reset-page-username">Usuario: {username}</p>
                    <p className="reset-page-prompt">Por favor, ingresa una nueva contraseña</p>
                    <input
                        id="reset-new-password"
                        name="password"
                        type="password"
                        value={userData.password}
                        placeholder="Contraseña"
                        onChange={handleChange}
                    />
                    <p className="reset-page-prompt">Confirma la nueva contraseña</p>
                    <input
                        id="reset-new-confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={userData.confirmPassword}
                        placeholder="Reingresa la contraseña"
                        onChange={handleChange}
                    />
                    <p id="reset-page-mismatch" style={{ opacity: userData.password !== '' && userData.confirmPassword !== '' && userData.password.length > 0 && userData.confirmPassword.length > 0 && userData.password !== userData.confirmPassword ? '1' : '0' }}>Las contraseñas no coinciden</p>
                    <button id="reset-page-submit" onClick={handleSubmit}>Enviar</button>
                    <div style={{
                        display: waiting,
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        placeContent: 'center',
                        placeItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }}>
                        <div className="loader"></div>
                    </div>
                    <div id="post-result-container" style={{ display: resultMessage.display }}>
                        <div className="result-container" style={{ animation: resultMessage.animation }}>
                            <img src={resultMessage.image} alt="" id="post-result-image" />
                            <p id="post-result-message">{resultMessage.message}</p>
                            <button className="result-confirm" style={{ display: resultMessage.confirmButton }} onClick={() => {
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
            </div>
        )
    }
}

export default PasswordReset