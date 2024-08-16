import { useEffect, useRef, useState } from "react"
import allTags from "../../config/allTags"
import { useCreatePostMutation } from "./postsApiSlice"
import { useNavigate } from "react-router-dom"

const NewPost = () => {

    const navigate = useNavigate()

    const [createPost, {
        //data: post,
        isLoading,
        // isSuccess,
        // isError,
        // error
    }] = useCreatePostMutation()

    const [postData, setPostData] = useState({
        title: '',
        heading: '',
        content: {
            allContent: '',
            currentParagraph: '<p></p>'
        },
        thumbnail: '../../Images/placeholder.png',
        imgDesc: '',
        imgCred: '',
        tags: []
    })

    const [imageWidth, setImageWidth] = useState('')

    const [addingTag, setAddingTag] = useState(false)

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '',
        display: 'none',
        confirmButton: 'none'
    })

    const [selectedText, setSelectedText] = useState('')

    // const [contentInnerHTML, setContentInnerHTML] = useState('')

    // const [currentParagraph, setCurrentParagraph] = useState('<p></p>')

    const newTagRef = useRef()

    useEffect(() => {
        document.addEventListener("mouseup", () => {
            let selection = window.getSelection()
            setSelectedText((prevState) => {
                const newState = selection.toString() !== '' ? selection.toString() : prevState
                return newState
            })
          })
          // eslint-disable-next-line
    }, [])

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

    const handleKeyDown = (e) => {
        const pattern = /^[A-Za-z0-9\s]$/
        //console.log(e.key)
        if (pattern.test(e.key)) {
            setPostData((prevState) => {
                const contentDiv = document.getElementById('new-post-content-div')
                console.log(prevState.content.currentParagraph.split('').splice(3, prevState.content.currentParagraph.length - 7).join('') + e.key)
                let currentParagraphInnerHTML
                if (prevState.content.currentParagraph.split('').splice(3, prevState.content.currentParagraph.length - 7).length !== contentDiv.innerText.length) {
                    currentParagraphInnerHTML = ''
                } else {
                    currentParagraphInnerHTML = contentDiv.innerText + e.key
                }
                console.log(`<p>${currentParagraphInnerHTML}</p>`)
                return {
                    ...prevState, 
                    content: {
                        ...prevState.content,
                        currentParagraph: `<p>${currentParagraphInnerHTML}</p>`
                    }
                }

                // let newParagraphText = prevState.content.currentParagraph
                // const arrString = newParagraphText.split('')
                // arrString.splice(-4, 0, e.key)
                // let newContent = prevState.content.allContent
                // const arrContent = newContent.split('')
                // arrContent.splice(0, prevState.content.allContent.length, arrString.join(''))
                // console.log(arrString.join(''))
                // console.log(arrContent.join(''))
                // return {
                //     ...prevState,
                //     content: {
                //         allContent: arrContent.join(''),
                //         currentParagraph: arrString.join('')
                //     }
                // }
            })
            // setCurrentParagraph((prevState) => {
            //     let newState = prevState
            //     const arrString = newState.split('')
            //     arrString.splice(-4, 0, e.key)
            //     setContentInnerHTML((prevContent) => {
            //         let newState = prevContent
            //         const arrContent = newState.split('')
            //         arrContent.splice(0, prevContent.length, arrString.join(''))
            //         console.log(arrContent.join(''))
            //         return arrContent.join('')
            //     })
            //     console.log(arrString.join(''))
            //     return arrString.join('')
            // })
            // const contentDiv = document.getElementById('new-post-content-div')
            // contentDiv.innerHTML = ''
            // contentDiv.innerHTML = contentInnerHTML
        } else if (e.key === 'Backspace') {
            setPostData((prevState) => {
                const contentDiv = document.getElementById('new-post-content-div')
                console.log(`<p>${contentDiv.innerText}</p>`)
                return {
                    ...prevState, 
                    content: {
                        ...prevState.content,
                        currentParagraph: `<p>${contentDiv.innerText}</p>`
                    }
                }
            })
            // setCurrentParagraph(() => {
            //     const contentDiv = document.getElementById('new-post-content-div')
            //     console.log(`<p>${contentDiv.innerText}</p>`)
            //     return `<p>${contentDiv.innerText}</p>`
            //     // if (prevState !== '<p></p>') {
            //     //     let newState = prevState
            //     //     const arrString = newState.split('')
            //     //     arrString.splice(-5, 1)
            //     //     console.log(arrString.join(''))
            //     //     return arrString.join('')
            //     // } else {
            //     //     return prevState
            //     // }
            // })
        } else if (e.key === 'Enter') {
            // setContentInnerHTML((prevState) => {
            //     //const selection = window.getSelection()
            //     //const newState = selection.anchorNode.data
            //     const pattern = /^[A-Za-z0-9\s]$/
            //     const newState = pattern.test(e.key) ? prevState + e.key : prevState
            //     //newState.push(selection.anchorNode.data)
            //     console.log(newState)
            //     return newState
            // })
        }
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
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'Publicación creada correctamente.',
                        display: 'grid'
                    }
                })
                setTimeout(() => {
                    navigate(`/post/${result.data.searchField}`)
                }, 2000)
            } catch (err) {
                console.log(err)
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: `Error al crear la publicación: ${err}`,
                        display: 'grid'
                    }
                })
            }
        } else {
            if (!postData.title) {
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'La publicación requiere un título.',
                        display: 'grid',
                        confirmButton: 'block'
                    }
                })
            } else if (!postData.heading) {
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'La publicación requiere un encabezado.',
                        display: 'grid',
                        confirmButton: 'block'
                    }
                })
            } else if (!postData.content) {
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'La publicación requiere contenido principal.',
                        display: 'grid',
                        confirmButton: 'block'
                    }
                })
            } else if (!postData.tags) {
                setResultMessage((prevState) => {
                    return {
                        ...prevState,
                        message: 'Por favor, agrega al menos una etiqueta.',
                        display: 'grid',
                        confirmButton: 'block'
                    }
                })
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
            {/* <button id="new-post-back" onClick={() => navigate('/')}><div>➜</div> Inicio</button> */}
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
                {/* <textarea
                    id="new-post-content"
                    name="content"
                    placeholder="Escribe aquí"
                    value={postData.content}
                    onChange={handleChange}
                ></textarea> */}
                <div
                    id="new-post-content-div"
                    contentEditable
                    onKeyDown={handleKeyDown}
                ></div>
                <div id="format-options">
                    <p className="format-option" onClick={() => {
                        // setContentInnerHTML((prevState) => {
                        //     //console.log(prevState)
                        //     const newState = prevState
                        //     //const newState = Array.from(prevState)
                        //     //console.log(newState)
                        //     //console.log(newState.indexOf(selectedText))
                        //     const arrayString = Array.from(newState)
                        //     arrayString.splice(newState.indexOf(selectedText), parseInt(selectedText.length), (<b>{selectedText}</b>))
                        //     //newState.splice(newState.indexOf(selectedText), parseInt(selectedText.length), (<b>{selectedText}</b>))
                        //     console.log(<p>{arrayString}</p>)
                        //     const contentDiv = document.getElementById('new-post-content-div')
                        //     contentDiv.innerHTML = (<p>{arrayString}</p>)
                        //     return arrayString
                        // })
                    }}>Bold</p>
                    <p className="format-option" onClick={() => {
                        // setContentInnerHTML((prevState) => {
                        //     const newState = prevState
                        //     console.log(selectedText)
                        //     console.log(newState.indexOf('es'))
                        //     const arrayString = [...newState]
                        //     arrayString.splice(newState.indexOf(selectedText), selectedText.length, (<i>{selectedText}</i>))
                        //     return arrayString
                        // })
                    }}>Italics</p>
                    <p className="format-option" onClick={() => {
                        // setContentInnerHTML((prevState) => {
                        //     const newState = prevState
                        //     //console.log(selectedText)
                        //     const arrayString = [...newState]
                        //     console.log(arrayString.indexOf(selectedText))
                        //     console.log(selectedText.length)
                        //     arrayString.splice(newState.indexOf(selectedText), selectedText.length, (<u>{selectedText}</u>))
                        //     return arrayString
                        // })
                    }}>Underlined</p>
                </div>
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
            <div id="post-result-container" style={{display: resultMessage.display}}>
                <div id="result-container">
                    <p id="post-result-message">{resultMessage.message}</p>
                    <img src={resultMessage.image} alt="" id="post-result-image"/>
                    <button id="result-confirm" style={{display: resultMessage.confirmButton}} onClick={() => {
                        setResultMessage((prevState) => {
                            return {
                                ...prevState,
                                display: 'none',
                                confirmButton: 'none'
                            }
                        })
                    }}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost