import { useEffect, useRef, useState } from "react"
import allTags from "../../config/allTags"
import { useCreatePostMutation } from "./postsApiSlice"
import { useNavigate } from "react-router-dom"

const NewPost = () => {

    const navigate = useNavigate()

    const [createPost, {
        data: post,
        isLoading,
        // isSuccess,
        // isError,
        // error
    }] = useCreatePostMutation()

    const [postData, setPostData] = useState({
        title: '',
        heading: '',
        content: '',
        thumbnail: '../../Images/placeholder.png',
        imgDesc: '',
        imgCred: '',
        tags: []
    })

    const [imageWidth, setImageWidth] = useState('')

    const [addingTag, setAddingTag] = useState(false)

    const newTagRef = useRef()

    useEffect(() => {
        const imageElement = document.getElementById('uploaded-image')
        setTimeout(() => {
            if (postData.thumbnail !== '../../Images/placeholder.png') setImageWidth(imageElement.width.toString())
        }, 10)
    }, [postData.thumbnail])

    const handleChange = (e) => {
        const { name, value } = e.target
        setPostData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        const author = ''
        const canSave = [postData.title, postData.heading, postData.content, postData.tags].every(Boolean) && !isLoading
        if (canSave) {
            try {
                const result = await createPost({
                    ...postData,
                    author
                })
                console.log(result)
                navigate(`/post/${result.data.searchField}`)
            } catch (err) {
                console.log(err)
            }
        }
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
                marginTop: '40px'
            }}>
            <img
                src={postData.thumbnail}
                alt=""
                id="uploaded-image"
                style={{
                    width: 'auto',
                    height: '300px'
                }}
            />
            <div
                style={{
                    display: postData.thumbnail !== '../../Images/placeholder.png' ? 'grid' : 'none',
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
                                thumbnail: '../../Images/placeholder.png'
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
            <button id="new-post-back" onClick={() => navigate(-1)}><div>➜</div> Atrás</button>
            <h1 id="new-post-h1">Nueva Publicación</h1>
            <form id="new-post-form">
                <label htmlFor="new-post-title" className="new-post-label">Título:</label>
                <input
                    id="new-post-title"
                    name="title"
                    type="text"
                    className="new-post-input"
                    placeholder="Escribe aquí"
                    value={postData.title}
                    onChange={handleChange}
                />
                <label htmlFor="new-post-heading" className="new-post-label">Encabezado:</label>
                <textarea
                    id="new-post-heading"
                    name="heading"
                    placeholder="Escribe aquí"
                    value={postData.heading}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="new-post-content" className="new-post-label">Contenido principal:</label>
                <textarea
                    id="new-post-content"
                    name="content"
                    placeholder="Escribe aquí"
                    value={postData.content}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="new-post-image" className="new-post-label">Imagen:</label>
                <div style={{ display: 'flex', width: '100%' }}>
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
                                        thumbnail: reader.result
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
                    name="imgDesc"
                    type="text"
                    className="new-post-input"
                    placeholder="Escribe aquí"
                    value={postData.imgDesc}
                    onChange={handleChange}
                />
                <label htmlFor="new-post-imageCred" className="new-post-label">Créditos de la imagen:</label>
                <input
                    id="new-post-imageCred"
                    name="imgCred"
                    type="text"
                    className="new-post-input"
                    placeholder="Escribe aquí"
                    value={postData.imgCred}
                    onChange={handleChange}
                />
                <div style={{ display: 'flex', gap: '20px' }}>
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
                    }}
                    style={{fontFamily: 'Impact, Haettenschweiler, `Arial Narrow Bold`, sans-serif', fontSize: '15px'}}>
                        <option value="" disabled hidden id='hidden' readOnly>Seleccionar</option>
                        {tagOptions}
                    </select>
                    <button id="add-tag-button" aria-label="test" onClick={(e) => {
                        e.preventDefault()
                        setAddingTag((prevState) => !prevState)
                        setTimeout(() => {
                            newTagRef.current.focus()
                        }, 10)
                    }}>{addingTag ? 'Cancelar': 'Agregar etiqueta'}</button>
                    <input id="new-tag-input" type="text" style={{display: addingTag ? 'block': 'none'}} ref={newTagRef} placeholder="Nueva etiqueta"/>
                    <button id="add-tag-confirm" style={{display: addingTag ? 'block': 'none'}} onClick={(e) => {
                        e.preventDefault()
                    }}>✓</button>
                </div>
                <div id="tag-elements-container">
                    {selectedTagsElements}
                </div>
            </form>
            <div id="new-post-buttons">
                <button id="new-post-cancel" onClick={() => { }}>Cancelar</button>
                <button id="new-post-submit" onClick={handleSubmit}>Guardar</button>
            </div>
        </div>
    )
}

export default NewPost