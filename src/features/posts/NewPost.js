import { useState } from "react"
import allTags from "../../config/allTags"

const NewPost = () => {

    const [postData, setPostData] = useState({
        title: '',
        heading: '',
        content: '',
        image: '',
        imageDesc: '',
        imageCred: '',
        tags: ''
    })

    const tagOptions = allTags.map(tag => {
        return (
            <option
                key={tag}
                value={tag}
            >{tag}
            </option>
        )
    })

    return (
        <div id="new-post-container">
            <h1 id="new-post-h1">Nueva Publicación</h1>
            <form id="new-post-form">
                <label htmlFor="new-post-title" className="new-post-label">Título:</label>
                <input
                    id="new-post-title"
                    name="new-post-title"
                    type="text"
                    className="new-post-input"
                    value={postData.title}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            title: e.target.value
                        }
                    })}
                />
                <label htmlFor="new-post-heading" className="new-post-label">Encabezado:</label>
                <textarea
                    id="new-post-heading"
                    name="new-post-heading"
                    value={postData.heading}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            heading: e.target.value
                        }
                    })}
                ></textarea>
                <label htmlFor="new-post-content" className="new-post-label">Contenido principal:</label>
                <textarea
                    id="new-post-content"
                    name="new-post-content"
                    value={postData.content}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            content: e.target.value
                        }
                    })}
                ></textarea>
                <label htmlFor="new-post-image" className="new-post-label">Imagen:</label>
                <input
                    id="new-post-image"
                    name="new-post-image"
                    type="file"
                    value={postData.image}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            image: e.target.value
                        }
                    })}
                />
                <label htmlFor="new-post-imageDesc" className="new-post-label">Descripción de la imagen:</label>
                <input
                    id="new-post-imageDesc"
                    name="new-post-imageDesc"
                    type="text"
                    className="new-post-input"
                    value={postData.imageDesc}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            imageDesc: e.target.value
                        }
                    })}
                />
                <label htmlFor="new-post-imageCred" className="new-post-label">Créditos de la imagen:</label>
                <input
                    id="new-post-imageCred"
                    name="new-post-imageCred"
                    type="text"
                    className="new-post-input"
                    value={postData.imageCred}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            imageCred: e.target.value
                        }
                    })}
                />
                <label htmlFor="new-post-tags" className="new-post-label">Etiquetas:</label>
                <select>
                    <option value="" disabled hidden id='hidden' readOnly selected>Seleccionar etiquetas</option>
                    {tagOptions}
                </select>
                <input
                    id="new-post-tags"
                    name="new-post-tags"
                    type="text"
                    className="new-post-input"
                    value={postData.tags}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            tags: e.target.value
                        }
                    })}
                />
            </form>
            <button id="submit" onClick={() => { }}>Guardar</button>
        </div>
    )
}

export default NewPost