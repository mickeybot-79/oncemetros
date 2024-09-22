import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBeforeUnload } from "react-router-dom"
import { useCreateAccountMutation } from "./authApiSlice"
import { jwtDecode } from "jwt-decode"
import baseUrl from "../../baseurl"

const NewUser = () => {

    const navigate = useNavigate()

    const token =window.localStorage.getItem('token')

    useEffect(() => {
        const userId = token ? jwtDecode(token).UserInfo.id : ''
        if (userId) navigate(`/user/${userId}`)
        //eslint-disable-next-line
    }, [])

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image: '../../Images/user-placeholder.jpg',
        aboutme: ''
    })

    const [isUserBlocking, setIsUserBlocking] = useState(false)

    const [pwdMismatch, setPwdMismatch] = useState(false)

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const [waiting, setWaiting] = useState('none')

    const [createAccount, { isLoading }] = useCreateAccountMutation()

    useEffect(() => {
        if (userData.username !== '' || userData.password !== '' || userData.image !== '../../Images/user-placeholder.jpg' || userData.aboutme !== '') {
            setIsUserBlocking(true)
        } else {
            setIsUserBlocking(false)
        }
    }, [userData])

    useBeforeUnload(
        useCallback((e) => {
            if (isUserBlocking) e.preventDefault()
        }, [isUserBlocking])
    )

    useEffect(() => {
        const confirmElement = document.getElementById('new-user-confirmPassword')
        if (userData.password !== '' && userData.confirmPassword !== '' && userData.password !== userData.confirmPassword && (document.activeElement !== confirmElement || userData.password.length === userData.confirmPassword.length)) {
            setPwdMismatch(true)
        } else {
            setPwdMismatch(false)
        }
    }, [userData])

    useEffect(() => {
        setTimeout(() => {
            if (userData.image !== '../../Images/user-placeholder.jpg') {
                const canvasElem = document.getElementById('uploaded-image')
                const hiddenImage = document.getElementById('hidden-image')
                const context = canvasElem.getContext("2d")
                canvasElem.width = 200
                canvasElem.height = 200
                context.drawImage(
                    hiddenImage,
                    0,
                    0,
                    canvasElem.width,
                    canvasElem.height
                )
                userData.image = canvasElem.toDataURL("image/jpeg", 0.5)
            }
        })
    }, [userData])

    // if (gettingToken) {
    //     return (
    //         <>
    //             <LoadingIcon/>
    //         </>
    //     )
    // }

    //if (!gettingToken) {

        const handleChange = (e) => {
            const { name, value } = e.target
            setUserData((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
        }
    
        const handleCreateUser = async () => {
            setWaiting('grid')
            const emailExp = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            const validEmail = userData.email && emailExp.test(userData.email)
            const canSave = [userData.username, userData.password, userData.confirmPassword === userData.password, validEmail].every(Boolean) && !isLoading
            if (canSave) {
                try {
                    const result = await createAccount(userData)
                    if (result?.data?.accessToken) {
                        const userId = jwtDecode(result?.data?.accessToken).UserInfo.id
                        window.localStorage.setItem('token', result?.data?.accessToken)
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                message: 'Usuario creado correctamente.',
                                display: 'grid',
                                image: '../../Images/success.gif'
                            }
                        })

                        setTimeout(() => {
                            navigate(`/user/${userId}`)
                        }, 2000)
                    } else {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                message: `${result?.error?.data?.error}`,
                                display: 'grid',
                                confirmButton: 'block',
                            }
                        })
                    }
                    setWaiting('none')
                } catch (err) {
                    console.log(err)
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'Ocurrió un error.',
                            display: 'grid',
                            confirmButton: 'block',
                        }
                    })
                }
            } else {
                setWaiting('none')
                if (!userData.username) {
                    setTimeout(() => {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                message: 'Por favor, ingresa un nombre de usuario.',
                                display: 'grid',
                                confirmButton: 'block',
                            }
                        })
                    }, 10)
                } else if (!userData.password) {
                    setTimeout(() => {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                message: 'Por favor, ingresa una contraseña.',
                                display: 'grid',
                                confirmButton: 'block',
                            }
                        })
                    }, 10)
                } else if (userData.password !== userData.confirmPassword) {
                    setTimeout(() => {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                message: 'Las contraseñas no coinciden',
                                display: 'grid',
                                confirmButton: 'block',
                            }
                        })
                    }, 10)
                } else if (!validEmail) {
                    setTimeout(() => {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                message: 'Por favor, ingresa un email válido de recuperación de contraseña.',
                                display: 'grid',
                                confirmButton: 'block',
                            }
                        })
                    }, 10)
                }
            }
        }

        const pictureElement = (
            <div
                style={{
                    maxWidth: '200px',
                    height: '200px',
                    marginTop: '0px',
                    marginLeft: '-30px'
                }}>
                <img
                    src={userData.image}
                    alt=""
                    id="hidden-image"
                    style={{
                        display: userData.image !== '../../Images/user-placeholder.jpg' ? 'none' : 'block',
                        width: '200px',
                        height: '200px',
                        borderRadius: '100%',
                        opacity: 0.7
                    }}
                />
                <canvas
                    id="uploaded-image"
                    style={{
                        display: userData.image !== '../../Images/user-placeholder.jpg' ? 'block' : 'none',
                        width: '200px',
                        height: '200px',
                        borderRadius: '100%'
                    }}
                >
                </canvas>
                <div
                    style={{
                        display: userData.image !== '../../Images/user-placeholder.jpg' ? 'grid' : 'none',
                        width: '200px',
                        height: '20px',
                        marginTop: '-20px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        position: 'absolute',
                        textAlign: 'right',
                        fontSize: '25px'
                    }}>
                    <p
                        onClick={() => {
                            setUserData((prevState) => {
                                return {
                                    ...prevState,
                                    image: '../../Images/user-placeholder.jpg'
                                }
                            })
                        }}
                        style={{
                            marginTop: '-6px',
                            marginRight: '10px',
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: '22px'
                        }}
                    >✖</p>
                </div>
            </div >
        )

        return (
            <div id="new-user-page-container">
                <a href={baseUrl.frontend} id="new-user-back"><div>➜</div> Volver</a>
                <h2 id="new-user-title">Registro de Usuario</h2>
                <form id="new-user-form">
                    <label htmlFor="new-user-username" className="new-user-label">Nombre de usuario:</label>
                    <input
                        id="new-user-username"
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="new-user-password" className="new-user-label">Contraseña:</label>
                    <input
                        id="new-user-password"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="new-user-confirmPassword" className="new-user-label">Confirmar contraseña:</label>
                    <input
                        id="new-user-confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Reingresa tu contraseña"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                    />
                    {pwdMismatch && <p
                        style={{
                            fontSize: '22px',
                            color: 'red',
                            fontWeight: '700',
                            marginTop: '-5px',
                            marginBottom: '-10px'
                        }}
                    >Las contraseñas no coinciden</p>}
                    <label htmlFor="new-user-email" className="new-user-label">Correo electrónico de recuperación de contraseña:</label>
                    <input
                        id="new-user-email"
                        type="text"
                        name="email"
                        placeholder="Correo electrónico"
                        value={userData.email}
                        onChange={handleChange} />
                    <div id="user-image-container">
                        <div id="image-label-input">
                            <label htmlFor="new-user-image" className="new-user-label">Imagen de perfil (opcional):</label>
                            <input
                                id="new-user-image"
                                type="file"
                                name="image"
                                accept="image/*"
                                value={''}
                                onChange={(e) => {
                                    var reader = new FileReader()
                                    reader.readAsDataURL(e.target.files[0])
                                    reader.onload = () => {
                                        setUserData((prevState) => {
                                            const newState = {
                                                ...prevState,
                                                image: reader.result
                                            }
                                            return newState
                                        })
                                    }
                                    reader.onerror = (error) => {
                                        console.log('Error: ', error)
                                    }
                                }}
                            />
                        </div>
                        {pictureElement}
                    </div>
                    <label htmlFor="new-user-aboutme" className="new-user-label">Acerca de mí (opcional):</label>
                    <textarea
                        id="new-user-aboutme"
                        name="aboutme"
                        placeholder="Agrega una descripción"
                        value={userData.aboutme}
                        onChange={handleChange}
                    ></textarea>
                    <div id="new-user-options">
                        <a href={baseUrl.frontend} id="new-user-cancel">Cancelar</a>
                        <button onClick={(e) => {
                            e.preventDefault()
                            handleCreateUser()
                        }} id="new-user-submit">Crear Usuario</button>
                    </div>
                </form>
                <div id="user-result-container" style={{ display: resultMessage.display }}>
                    <div className="result-container" style={{ animation: resultMessage.animation }}>
                        <img src={resultMessage.image} alt="" id="user-result-image" />
                        <p id="user-result-message">{resultMessage.message}</p>
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
    //}

}

export default NewUser