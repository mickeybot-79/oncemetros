import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBeforeUnload } from "react-router-dom"
import { useCreateAccountMutation } from "./authApiSlice"

const NewUser = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        image: '../../Images/user-placeholder.jpg',
        aboutme: ''
    })

    const [imageWidth, setImageWidth] = useState('')

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

    const [createAccount, { isLoading } ] = useCreateAccountMutation()

    const confirmPwdRef = useRef()

    useBeforeUnload(
        useCallback((e) => {
            console.log(userData)
            console.log(isUserBlocking)
            e.preventDefault()
            if (isUserBlocking) e.preventDefault()
        }, [isUserBlocking, userData])
    )
    
    useEffect(() => {
        if (userData.username !== '' || userData.password !== '' || userData.image !== '../../Images/user-placeholder.jpg' || userData.aboutme !== '') {
            setIsUserBlocking(true)
        } else {
            setIsUserBlocking(false)
        }
    }, [userData])

    useEffect(() => {
        const imageElement = document.getElementById('uploaded-image')
        setTimeout(() => {
            if (userData.image !== '../../Images/user-placeholder.jpg') setImageWidth(imageElement.width.toString())
        }, 10)
    }, [userData.image])

    useEffect(() => {
        const confirmElement = document.getElementById('new-user-confirmPassword')
        if (userData.password !== '' && userData.confirmPassword !== '' && userData.password !== userData.confirmPassword && document.activeElement !== confirmElement) {
            setPwdMismatch(true)
        } else {
            setPwdMismatch(false)
        }
    }, [userData])

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
        const canSave = [userData.username, userData.password, userData.confirmPassword === userData.password].every(Boolean) && !isLoading
        if (canSave) {
            try {
                const result = await createAccount(userData)
                //console.log(result)
                if (result?.data?.accessToken) {
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'Usuario creado correctamente.',
                            display: 'grid',
                            image: '../../Images/success.gif'
                        }
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } else {
                    //console.log(result)
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: `${result?.error?.data?.message}`,
                            display: 'grid',
                            confirmButton: 'block',
                        }
                    })
                }
                setWaiting('none')
            } catch (err) {
                console.log(err)
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
            } else if (userData.password !== userData.confirmPasswordassword) {
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
            }
        }
    }

    const pictureElement = (
        <div
            style={{
                maxWidth: '300px',
                height: '150px',
                marginTop: '0px',
                marginLeft: '-30px'
            }}>
            <img
                src={userData.image}
                alt=""
                id="uploaded-image"
                style={{
                    width: '150px',
                    height: '150px',
                    opacity: userData.image !== '../../Images/user-placeholder.jpg' ? '1' : '0.7',
                    borderRadius: '100%',
                    objectFit: 'cover'
                }}
            />
            <div
                style={{
                    display: userData.image !== '../../Images/user-placeholder.jpg' ? 'grid' : 'none',
                    width: `${imageWidth}px`,
                    height: '20px',
                    marginTop: '-24px',
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
            <button id="new-user-back" onClick={() => navigate(-1)}><div>➜</div> Volver</button>
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
                    ref={confirmPwdRef}
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
                <div id="user-image-container">
                    <div id="image-label-input">
                        <label htmlFor="new-user-image" className="new-user-label">Imagen de perfil:</label>
                        <input
                            id="new-user-image"
                            type="file"
                            name="image"
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
                <label htmlFor="new-user-aboutme" className="new-user-label">Acerca de mí:</label>
                <textarea
                    id="new-user-aboutme"
                    name="aboutme"
                    placeholder="Agrega una descripción"
                    value={userData.aboutme}
                    onChange={handleChange}
                ></textarea>
                <div id="new-user-options">
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate(-1)
                    }} id="new-user-cancel">Cancelar</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleCreateUser()
                    }} id="new-user-submit">Crear Usuario</button>
                </div>
            </form>
            <div id="user-result-container" style={{display: resultMessage.display}}>
                <div className="result-container" style={{animation: resultMessage.animation}}>
                    <img src={resultMessage.image} alt="" id="user-result-image"/>
                    <p id="user-result-message">{resultMessage.message}</p>
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

export default NewUser