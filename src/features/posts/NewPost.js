import { useEffect, useState } from "react"
import allTags from "../../config/allTags"

const NewPost = () => {

    const [postData, setPostData] = useState({
        title: '',
        heading: '',
        content: '',
        image: '../../Images/placeholder.png',
        imageDesc: '',
        imageCred: '',
        tags: []
    })

    const [imageWidth, setImageWidth] = useState('')

    useEffect(() => {
        const imageElement = document.getElementById('uploaded-image')
        setImageWidth(imageElement.width.toString())
    }, [postData.image])

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const tagOptions = allTags.map(tag => {
        return (
            <option
                key={tag}
                value={tag}
            >{tag}
            </option>
        )
    })

    const pictureElement = (
        <div
            style={{
                width: 'auto',
                height: '300px',
                marginTop: '40px',
                marginLeft: '0px'
            }}>
            <img
                src={postData.image}
                alt=""
                id="uploaded-image"
                style={{
                    width: 'auto',
                    height: '300px'
                }}
            />
            <div
                style={{
                    display: postData.image !== '../../Images/placeholder.png' ? 'grid' : 'none',
                    width: `${imageWidth}px`,
                    height: '30px',
                    marginTop: '-34px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    position: 'absolute',
                    textAlign: 'right',
                    fontSize: '25px'
                }}>
                <p
                    onClick={() => {
                        setPostData((prevState) => {
                            return {
                                ...prevState,
                                image: '../../Images/placeholder.png'
                            }
                        })
                    }}
                    style={{
                        marginTop: '-2px',
                        marginRight: '10px',
                        color: 'red',
                        cursor: 'pointer'
                    }}
                >✖</p>
            </div>
        </div >
    )

    const selectedTagsElements = postData.tags.map(tag => {

        const listener = () => {
            setPostData((prevState) => {
                const updatedTags = [...prevState.tags]
                const tagIndex = updatedTags.indexOf(tag)
                updatedTags.splice(tagIndex, 1)
                return {
                    ...prevState,
                    tags: updatedTags
                }
            })
        }

        return (
            <div key={tag} className="tag-element">{tag} <span onClick={listener}>x</span></div>
        )
    })

    return (
        <div id="new-post-container">
            <button>Volver</button>
            <button id="submit" onClick={() => { }}>Guardar</button>
            <h1 id="new-post-h1">Nueva Publicación</h1>
            <form id="new-post-form">
                <label htmlFor="new-post-title" className="new-post-label">Título:</label>
                <input
                    id="new-post-title"
                    name="title"
                    type="text"
                    className="new-post-input"
                    value={postData.title}
                    onChange={handleChange}
                />
                <label htmlFor="new-post-heading" className="new-post-label">Encabezado:</label>
                <textarea
                    id="new-post-heading"
                    name="heading"
                    value={postData.heading}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="new-post-content" className="new-post-label">Contenido principal:</label>
                <textarea
                    id="new-post-content"
                    name="content"
                    value={postData.content}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="new-post-image" className="new-post-label">Imagen:</label>
                <div style={{ display: 'flex' }}>
                    <input
                        id="new-post-image"
                        name="new-post-image"
                        type="file"
                        value={''}
                        onChange={(e) => {
                            var reader = new FileReader()
                            reader.readAsDataURL(e.target.files[0])
                            reader.onload = () => {
                                setPostData((prevState) => {
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
                    {pictureElement}
                </div>
                <label htmlFor="new-post-imageDesc" className="new-post-label">Descripción de la imagen:</label>
                <input
                    id="new-post-imageDesc"
                    name="imageDesc"
                    type="text"
                    className="new-post-input"
                    value={postData.imageDesc}
                    onChange={handleChange}
                />
                <label htmlFor="new-post-imageCred" className="new-post-label">Créditos de la imagen:</label>
                <input
                    id="new-post-imageCred"
                    name="imageCred"
                    type="text"
                    className="new-post-input"
                    value={postData.imageCred}
                    onChange={handleChange}
                />
                <div style={{ display: 'flex' }}>
                    <label htmlFor="new-post-tags" className="new-post-label">Etiquetas:</label>
                    <select id="tags-select" defaultValue="" onChange={(e) => {
                        setPostData((prevState) => {
                            const updatedTags = [...prevState.tags]
                            if (!updatedTags.includes(e.target.value)) updatedTags.push(e.target.value)
                            return {
                                ...prevState,
                                tags: updatedTags
                            }
                        })
                    }}>
                        <option value="" disabled hidden id='hidden' readOnly>Seleccionar</option>
                        {tagOptions}
                    </select>
                </div>
                <div id="tag-elements-container">
                    {selectedTagsElements}
                </div>
            </form>
        </div>
    )
}

export default NewPost