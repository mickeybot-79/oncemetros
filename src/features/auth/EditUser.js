import { useState } from "react"

const EditUser = ({ displayEditOptions, handleCloseEdit }) => {

    const [selectedOption, setSelectedOption] = useState('')

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        image: '',
        aboutme: ''
    })

    console.log(selectedOption)

    const editImage = (
        <div style={{display: selectedOption === 'image' ? 'grid' : 'none', width: '50%', height: '100vh'}}>
            <input 
                id="image-reset"
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
            <img src="" alt=""/>
            <button onClick={() => setSelectedOption('')}>Cancelar</button>
            <button>Aceptar</button>
        </div>
    )

    const editAboutMe = (
        <div style={{display: selectedOption === 'aboutme' ? 'grid' : 'none' }}>

        </div>
    )

    const editPassword = (
        <div style={{display: selectedOption === 'password' ? 'grid' : 'none' }}>

        </div>
    )

    const deleteAccount = (
        <div style={{display: selectedOption === 'delete' ? 'grid' : 'none' }}>

        </div>
    )

    return (
        <div id="edit-account-container" style={{display: displayEditOptions ? 'grid' : 'none'}}>
            <ul id="edit-options-container" >
                <li className="edit-account-option" onClick={() => setSelectedOption('image')}>Cambiar imagen de perfil</li>
                <li className="edit-account-option" onClick={() => setSelectedOption('aboutme')}>Editar descripción</li>
                <li className="edit-account-option" onClick={() => setSelectedOption('password')}>Editar contraseña</li>
                <li className="edit-account-option" onClick={() => setSelectedOption('delete')}>Eliminar cuenta</li>
                <li id="close-edit-button" onClick={() => {
                    setSelectedOption('')
                    handleCloseEdit()
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