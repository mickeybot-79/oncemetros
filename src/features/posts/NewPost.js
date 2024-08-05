import { useState } from "react"

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

    return (
        <>
            <form>
                <label htmlFor="title">Título:</label>
                <input
                    id="title"
                    type="text"
                    value={postData.title}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            title: e.target.value
                        }
                    })}
                />
                <label htmlFor="heading">Encabezado:</label>
                <input
                    id="heading"
                    type="text"
                    value={postData.heading}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            heading: e.target.value
                        }
                    })}
                />
                <label htmlFor="content">Contenido:</label>
                <textarea
                    id="content"
                    type="text"
                    value={postData.content}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            content: e.target.value
                        }
                    })}
                ></textarea>
                <label htmlFor="image">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    value={postData.image}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            image: e.target.value
                        }
                    })}
                />
                <label htmlFor="imageDesc">Descripción de imagen:</label>
                <input
                    id="imageDesc"
                    type="text"
                    value={postData.imageDesc}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            imageDesc: e.target.value
                        }
                    })}
                />
                <label htmlFor="imageCred">Créditos de imagen:</label>
                <input
                    id="imageCred"
                    type="text"
                    value={postData.imageCred}
                    onChange={(e) => setPostData((prevState) => {
                        return {
                            ...prevState,
                            imageCred: e.target.value
                        }
                    })}
                />
                <label htmlFor="tags">Etiquetas:</label>
                <select></select>
                <input
                    id="tags"
                    type="text"
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
        </>
    )
}

export default NewPost