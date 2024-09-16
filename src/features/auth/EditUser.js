import { useEffect, useState } from "react"
import { useDeleteUserMutation, useUpdateUserDataMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"

const EditUser = ({ user, displayEditOptions, handleUpdateUserData, handleCloseEdit, editOptionsAnimation, handleEditOptionsAnimation }) => {

    const navigate = useNavigate()

    const [selectedOption, setSelectedOption] = useState('')

    const [imageChanged, setImageChanged] = useState(false)

    const [userData, setUserData] = useState({
        username: user.username,
        roles: user.roles,
        userId: window.sessionStorage.getItem('userId') || '',
        password: '',
        confirmPassword: '',
        image: user.image,
        aboutme: user.aboutme
    })

    const [selectedOptionAnimation, setSelectedOptionAnimation] = useState('')

    const [deleteAccountDisplay, setDeleteAccountDisplay] = useState('none')

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const [waiting, setWaiting] = useState('none')

    const [updateUserData] = useUpdateUserDataMutation()

    const [deleteUser] = useDeleteUserMutation()

    useEffect(() => {
        if (user.image && !userData.image) setUserData(user)
        setTimeout(() => {
            if (imageChanged) {
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
                setUserData((prevState) => {
                    return {
                        ...prevState,
                        image: canvasElem.toDataURL("image/jpeg", 0.5)
                    }
                })
            }
        })
    }, [user, userData, imageChanged])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const editImage = (
        <div style={{ 
            display: selectedOption === 'image' ? 'grid' : 'none',
            placeContent: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            gap: '30px',
            paddingLeft: '30px',
            width: '450px', 
            height: '100vh',
            animation: selectedOptionAnimation,
            background: `linear-gradient(90deg, 
                rgba(77, 214, 207, 0.01),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884))`}}>
            <div
                style={{
                    marginTop: '0px',
                    marginLeft: '-30px',
                    display: 'grid',
                    placeContent: 'center'
                }}>
                <p style={{fontSize: '22px', textShadow: '1px 1px'}}>{imageChanged ? 'Nueva imagen:' : 'Imagen actual:'}</p>
                <img
                    src={userData.image}
                    alt=""
                    id="hidden-image"
                    style={{
                        display: imageChanged ? 'none' : 'block',
                        width: '200px',
                        height: '200px',
                        borderRadius: '100%'
                    }}
                />
                <canvas
                    id="uploaded-image"
                    style={{
                        display: imageChanged ? 'block' : 'none',
                        width: '200px',
                        height: '200px',
                        borderRadius: '100%'
                    }}
                >
                </canvas>
                <div
                    style={{
                        display: imageChanged ? 'grid' : 'none',
                        width: '200px',
                        height: '20px',
                        marginTop: '255px',
                        marginLeft: '65px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        position: 'absolute',
                        textAlign: 'right',
                        fontSize: '25px'
                    }}>
                    <p
                        onClick={() => {
                            setImageChanged(false)
                            setUserData((prevState) => {
                                return {
                                    ...prevState,
                                    image: user.image
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
            <input
                id="user-edit-image"
                type="file"
                accept="image/*"
                value={''}
                onChange={(e) => {
                    var reader = new FileReader()
                    reader.readAsDataURL(e.target.files[0])
                    reader.onload = () => {
                        setImageChanged(true)
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
            <div style={{ display: 'flex', gap: '20px' }}>
                <button className="user-edit-button-cancel" onClick={() => {
                    setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
                    setTimeout(() => {
                        setSelectedOption('')
                        setUserData({
                            username: user.username,
                            roles: user.roles,
                            userId: window.sessionStorage.getItem('userId') || '',
                            password: '',
                            confirmPassword: '',
                            image: user.image,
                            aboutme: user.aboutme
                        })
                    }, 180)
                }}>Cancelar</button>
                <button className="user-edit-button-submit" onClick={async () => {
                    if (imageChanged) {
                        setWaiting('grid')
                        try {
                            const result = await updateUserData({userData})
                            console.log(result)
                            setWaiting('none')
                            handleUpdateUserData(userData)
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: 'Imagen actualizada correctamente.',
                                    display: 'grid',
                                    confirmButton: 'block',
                                    image: '../../Images/success.gif'
                                }
                            })
                            setImageChanged(false)
                        } catch (err) {
                            console.log(err)
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: err,
                                    display: 'grid',
                                    confirmButton: 'block',
                                }
                            })
                        }
                    } else {
                        setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
                        setTimeout(() => {
                            setSelectedOption('')
                            setUserData({
                                username: user.username,
                                roles: user.roles,
                                userId: window.sessionStorage.getItem('userId') || '',
                                password: '',
                                confirmPassword: '',
                                image: user.image,
                                aboutme: user.aboutme
                            })
                        }, 180)
                    }
                }}>Guardar</button>
            </div>
        </div>
    )

    const editAboutMe = (
        <div
            style={{
                display: selectedOption === 'aboutme' ? 'grid' : 'none',
                placeContent: 'center',
                gap: '50px',
                paddingLeft: '30px',
                width: '450px',
                height: '100vh',
                animation: selectedOptionAnimation,
                background: `linear-gradient(90deg, 
                rgba(77, 214, 207, 0.01),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884))`}}>
            <p style={{ fontSize: '22px', textShadow: '1px 1px' }}>Tu descripción:</p>
            <textarea
                style={{ width: '300px', height: '350px', fontSize: '18px' }}
                placeholder="Escribe una descripción"
                name="aboutme"
                value={userData.aboutme}
                onChange={(e) => handleChange(e)}></textarea>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button className="user-edit-button-cancel" onClick={() => {
                    setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
                    setTimeout(() => {
                        setSelectedOption('')
                        setUserData({
                            username: user.username,
                            roles: user.roles,
                            userId: window.sessionStorage.getItem('userId') || '',
                            password: '',
                            confirmPassword: '',
                            image: user.image,
                            aboutme: user.aboutme
                        })
                    }, 180)
                }}>Cancelar</button>
                <button className="user-edit-button-submit" onClick={async () => {
                    if (userData.aboutme !== '' && userData.aboutme !== user.aboutme) {
                        setWaiting('grid')
                        try {
                            const result = await updateUserData({userData})
                            console.log(result)
                            setWaiting('none')
                            handleUpdateUserData(userData)
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: 'Descripción actualizada correctamente.',
                                    display: 'grid',
                                    confirmButton: 'block',
                                    image: '../../Images/success.gif'
                                }
                            })
                        } catch (err) {
                            console.log(err)
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: err,
                                    display: 'grid',
                                    confirmButton: 'block',
                                }
                            })
                        }
                    } else {
                        setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
                        setTimeout(() => {
                            setSelectedOption('')
                            setUserData({
                                username: user.username,
                                roles: user.roles,
                                userId: window.sessionStorage.getItem('userId') || '',
                                password: '',
                                confirmPassword: '',
                                image: user.image,
                                aboutme: user.aboutme
                            })
                        }, 180)
                    }
                }}>Guardar</button>
            </div>
        </div>
    )

    const editPassword = (
        <div
            style={{
                display: selectedOption === 'password' ? 'grid' : 'none',
                placeContent: 'center',
                gap: '50px',
                paddingLeft: '30px',
                width: '450px',
                height: '100vh',
                animation: selectedOptionAnimation,
                background: `linear-gradient(90deg, 
                rgba(77, 214, 207, 0.01),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884))`}}>
            <p style={{ fontSize: '22px', textShadow: '1px 1px', marginBottom: '-30px' }}>Nueva contraseña:</p>
            <input
                className="new-password-input"
                placeholder="Nueva contraseña"
                name="password"
                type="password"
                value={userData.password}
                onChange={(e) => handleChange(e)}/>
            <p style={{ fontSize: '22px', textShadow: '1px 1px', marginBottom: '-30px' }}>Confirmar contraseña:</p>
            <input
                className="new-password-input"
                placeholder="Reintroducir contraseña"
                name="confirmPassword"
                type="password"
                value={userData.confirmPassword}
                onChange={(e) => handleChange(e)}/>
            <p style={{opacity: userData.password !== '' && userData.confirmPassword !== '' && userData.password?.length === userData.confirmPassword?.length && userData.password !== userData.confirmPassword ? '1' : '0', color: 'red', fontSize: '22px', margin: '0px'}}>Las contraseñas no coinciden</p>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button className="user-edit-button-cancel" onClick={() => {
                    setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
                    setTimeout(() => {
                        setSelectedOption('')
                        setUserData({
                            username: user.username,
                            roles: user.roles,
                            userId: window.sessionStorage.getItem('userId') || '',
                            password: '',
                            confirmPassword: '',
                            image: user.image,
                            aboutme: user.aboutme
                        })
                    }, 180)
                }}>Cancelar</button>
                <button className="user-edit-button-submit" onClick={async() => {
                    if (userData.password !== '' && userData.confirmPassword !== '' && userData.password === userData.confirmPassword) {
                        setWaiting('grid')
                        try {
                            const result = await updateUserData({userData})
                            console.log(result)
                            setWaiting('none')
                            handleUpdateUserData(userData)
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: 'Contraseña actualizada correctamente.',
                                    display: 'grid',
                                    confirmButton: 'block',
                                    image: '../../Images/success.gif'
                                }
                            })
                        } catch (err) {
                            console.log(err)
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: err,
                                    display: 'grid',
                                    confirmButton: 'block',
                                }
                            })
                        }
                    } else  if (userData.password === '' && userData.confirmPassword === '') {
                        setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
                        setTimeout(() => {
                            setSelectedOption('')
                            setUserData({
                                username: user.username,
                                roles: user.roles,
                                userId: window.sessionStorage.getItem('userId') || '',
                                password: '',
                                confirmPassword: '',
                                image: user.image,
                                aboutme: user.aboutme
                            })
                        }, 180)
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
                }}>Guardar</button>
            </div>
        </div>
    )

    const deleteAccount = (
        <div
            style={{
                display: selectedOption === 'delete' ? 'grid' : 'none',
                placeContent: 'center',
                gap: '50px',
                paddingLeft: '30px',
                width: '450px',
                height: '100vh',
                animation: selectedOptionAnimation,
                background: `linear-gradient(90deg, 
                rgba(77, 214, 207, 0.01),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884),
                rgba(77, 214, 207, 0.884))`}}>
            <p style={{ fontSize: '22px', textShadow: '1px 1px' }}>¿Seguro que deseas eliminar tu cuenta?</p>
            <div style={{display: 'flex', gap: '20px'}}>
        <button className="user-edit-button-cancel" onClick={() => {
            setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
            setTimeout(() => {
                setSelectedOption('')
                setUserData({
                    password: '',
                    confirmPassword: '',
                    image: user.image,
                    aboutme: user.aboutme
                })
            }, 180)
        }}>Cancelar</button>
        <button className="user-edit-button-submit" onClick={() => setDeleteAccountDisplay('grid')}>Eliminar cuenta</button>
    </div>
        </div>
    )

    return (
        <div id="edit-account-container" style={{display: displayEditOptions ? 'grid' : 'none'}}>
            <ul id="edit-options-container" style={{animation: editOptionsAnimation}}>
                <li className="edit-account-option" onClick={() => {
                    setSelectedOption('image')
                    setSelectedOptionAnimation('selected-option-in 0.2s linear 1')
                }}>Cambiar imagen de perfil</li>
                <li className="edit-account-option" onClick={() => {
                    setSelectedOption('aboutme')
                    setSelectedOptionAnimation('selected-option-in 0.2s linear 1')
                }}>Editar descripción</li>
                <li className="edit-account-option" onClick={() => {
                    setSelectedOption('password')
                    setSelectedOptionAnimation('selected-option-in 0.2s linear 1')
                }}>Cambiar contraseña</li>
                <li className="edit-account-option" onClick={() => {
                    setSelectedOption('delete')
                    setSelectedOptionAnimation('selected-option-in 0.2s linear 1')
                }}><span>Eliminar cuenta</span></li>
                <li id="close-edit-button" onClick={() => {
                    handleEditOptionsAnimation('edit-form-out 0.2s linear 1')
                    setTimeout(() => {
                        setSelectedOption('')
                        handleCloseEdit()
                    }, 180)
                }}>Cerrar</li>
            </ul>
            <div id="selected-edit-option" style={{display: selectedOption !== '' ? 'grid' : 'none'}}>
                {editImage}
                {editAboutMe}
                {editPassword}
                {deleteAccount}
            </div>
            <div style={{display: deleteAccountDisplay, position: 'fixed', width: '100%', height: '100%', placeContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '10px', display: 'grid', placeContent: 'center' }}>
                    <p style={{fontSize: '25px'}}>Recuerda que esta acción no puede revertirse</p>
                    <div style={{display: 'flex', placeContent: 'center', gap: '20px', marginTop: '20px'}}>
                        <button id="delete-account-cancel" onClick={() => setDeleteAccountDisplay('none')}>Cancelar</button>
                        <button id="delete-account-submit" onClick={async () => {
                            const result = await deleteUser(window.sessionStorage.getItem('userId'))
                            console.log(result)
                            window.sessionStorage.removeItem('userId')
                            window.sessionStorage.removeItem('userRoles')
                            window.sessionStorage.removeItem('username')
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: 'Tu cuenta ha sido eliminada',
                                    display: 'grid',
                                    image: '../../Images/success.gif'
                                }
                            })
                            setTimeout(() => {
                                navigate('/')
                            }, 1000)
                        }}>Eliminar cuenta</button>
                    </div>
                </div>
            </div>
            <div id="post-result-container" style={{display: resultMessage.display}}>
                <div className="result-container" style={{animation: resultMessage.animation}}>
                    <img src={resultMessage.image} alt="" id="post-result-image"/>
                    <p id="post-result-message">{resultMessage.message}</p>
                    <button className="result-confirm" style={{display: resultMessage.confirmButton}} onClick={() => {
                        //setSelectedOption('')
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

export default EditUser