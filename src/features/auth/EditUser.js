import { getSuggestedQuery } from "@testing-library/react"
import { useEffect, useState } from "react"

const EditUser = ({ user, displayEditOptions, handleCloseEdit, editOptionsAnimation, handleEditOptionsAnimation }) => {

    const [selectedOption, setSelectedOption] = useState('')

    const currentImage = user.image

    const [userData, setUserData] = useState({
        password: '',
        confirmPassword: '',
        image: currentImage,
        aboutme: user.aboutme
    })

    const [selectedOptionAnimation, setSelectedOptionAnimation] = useState('')

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

    console.log(user)

    const editButtons = (
        <div style={{display: 'flex', gap: '20px'}}>
        <button className="user-edit-button-cancel" onClick={() => {
            setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
            setTimeout(() => {
                setSelectedOption('')
                setUserData({
                    password: '',
                    confirmPassword: '',
                    image: currentImage,
                    aboutme: user.aboutme
                })
            }, 180)
        }}>Cancelar</button>
        <button className="user-edit-button-submit">Guardar</button>
    </div>
    )

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
                <p style={{fontSize: '18px', textShadow: '1px 1px'}}>{userData.image !== currentImage ? 'Nueva imagen:' : 'Imagen actual:'}</p>
                <img
                    src={userData.image}
                    alt=""
                    id="hidden-image"
                    style={{
                        display: userData.image !== currentImage ? 'none' : 'block',
                        width: '200px',
                        height: '200px',
                        borderRadius: '100%'
                    }}
                />
                <canvas
                    id="uploaded-image"
                    style={{
                        display: userData.image !== currentImage ? 'block' : 'none',
                        width: '200px',
                        height: '200px',
                        borderRadius: '100%'
                    }}
                >
                </canvas>
                <div
                    style={{
                        display: userData.image !== currentImage ? 'grid' : 'none',
                        width: '200px',
                        height: '20px',
                        marginTop: '240px',
                        marginLeft: '65px',
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
                                    image: currentImage
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
            {editButtons}
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
            <p style={{ fontSize: '18px', textShadow: '1px 1px' }}>Tu descripción:</p>
            <textarea
                style={{ width: '300px', height: '350px', fontSize: '18px' }}
                value={userData.aboutme}
                onChange={(e) => setUserData((prevState) => {
                    return {
                        ...prevState,
                        aboutme: e.target.value
                    }
                })}></textarea>
            {editButtons}
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
            <p style={{ fontSize: '18px', textShadow: '1px 1px' }}>Nueva contraseña:</p>
            <input />
            <p style={{ fontSize: '18px', textShadow: '1px 1px' }}>Confirmar contraseña:</p>
            <input />
            {editButtons}
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
            <p style={{ fontSize: '18px', textShadow: '1px 1px' }}>¿Seguro que deseas eliminar tu cuenta?</p>
            <p style={{ fontSize: '18px', textShadow: '1px 1px' }}>Recuerda que esta acción no puede revertirse</p>
            <div style={{display: 'flex', gap: '20px'}}>
        <button className="user-edit-button-cancel" onClick={() => {
            setSelectedOptionAnimation('selected-option-out 0.2s linear 1')
            setTimeout(() => {
                setSelectedOption('')
                setUserData({
                    password: '',
                    confirmPassword: '',
                    image: currentImage,
                    aboutme: user.aboutme
                })
            }, 180)
        }}>Cancelar</button>
        <button className="user-edit-button-submit">Eliminar cuenta</button>
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
        </div>
    )
}

export default EditUser