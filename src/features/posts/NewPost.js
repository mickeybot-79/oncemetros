import { useEffect, useRef, useState, useCallback } from "react"
import { useCreatePostMutation, useGetTagsQuery, useAddTagMutation } from "./postsApiSlice"
import { useNavigate, useBeforeUnload } from "react-router-dom"
import Quill from "quill"
import Editor from "./EditorTest"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../auth/authSlice"
import { jwtDecode } from "jwt-decode"
import baseUrl from "../../baseurl"

const NewPost = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const userRoles = window.sessionStorage.getItem('userRoles').split(',')
        setTimeout(() => {
            if (userRoles.length < 2 || !userRoles.includes('Editor')) {
                navigate('/')
            }
        }, 500)
        //eslint-disable-next-line
    }, [])

    const token = useSelector(selectCurrentToken)
    var userId = token ? jwtDecode(token).UserInfo.id : ''

    /* ADD HANDLER FOR WHEN LOGIN EXPIRES!! */

    const {
        data: tags,
        isSuccess: isTagsSuccess
    } = useGetTagsQuery('tagsList', {
        refetchOnMountOrArgChange: true
    })

    const [addTag] = useAddTagMutation()

    const Delta = Quill.import('delta')

    const [createPost, {
        isLoading,
    }] = useCreatePostMutation()

    const [tagOptions, setTagOptions] = useState([])

    const currentPostTags = window.sessionStorage.getItem('postTags')
    const currentPostContent = window.sessionStorage.getItem('postContent')

    const [postData, setPostData] = useState({
        title: window.sessionStorage.getItem('postTitle') || '',
        heading: window.sessionStorage.getItem('postHeading') || '',
        content: currentPostContent && currentPostContent !== '<p><br></p>' ? currentPostContent : '',
        thumbnail: window.sessionStorage.getItem('postThumbnail') || '../../Images/placeholder.png',
        imgDesc: window.sessionStorage.getItem('postImgDesc') || '',
        imgCred: window.sessionStorage.getItem('postImgCred') || '',
        tags: currentPostTags ? currentPostTags.split(',') : [],
        insPost: window.sessionStorage.getItem('postInsPost') || ''
    })

    const [imageWidth, setImageWidth] = useState('')

    const [addingTag, setAddingTag] = useState(false)

    const [resultMessage, setResultMessage] = useState({
        message: '',
        image: '../../Images/error-image.png',
        display: 'none',
        confirmButton: 'none',
        animation: 'new-post-result 0.2s linear 1'
    })

    const [writingStyle, setWritingStyle] = useState('type')

    const [waiting, setWaiting] = useState('none')

    const [isBlocking, setIsBlocking] = useState(false)

    const [imageMethod, setImageMethod] = useState({
        selectedOption: window.sessionStorage.getItem('imageMethod') || 'link',
        selectedValue: window.sessionStorage.getItem('imageMethod') === 'link' && window.sessionStorage.getItem('postImage') !== 'null' ? window.sessionStorage.getItem('postImage') : ''
    })

    const [editorPromptDisplay, setEditorPromptDisplay] = useState('block')

    const [editorLeft, setEditorLeft] = useState()

    useBeforeUnload(
        useCallback((e) => {
            const editorElement = document.getElementsByClassName('ql-editor')[0]
            window.sessionStorage.setItem('postTitle', postData.title)
            window.sessionStorage.setItem('postHeading', postData.heading)
            window.sessionStorage.setItem('postContent', editorElement.innerHTML.toString())
            window.sessionStorage.setItem('postImgDesc', postData.imgDesc)
            window.sessionStorage.setItem('postImgCred', postData.imgCred)
            window.sessionStorage.setItem('postTags', postData.tags.join(','))
            window.sessionStorage.setItem('postInsPost', postData.insPost)
            if (imageMethod.selectedOption === 'upload') {
                window.sessionStorage.setItem('postThumbnail', postData.thumbnail)
            } else {
                window.sessionStorage.setItem('postImage', imageMethod.selectedValue)
            }
            window.sessionStorage.setItem('imageMethod', imageMethod.selectedOption)
            if (isBlocking) e.preventDefault()
        }, [isBlocking, postData, imageMethod])
    )

    const newTagRef = useRef()
    const quillRef = useRef()
    const topRef = useRef()

    //Editor format buttons and prompt effect
    useEffect(() => {
        if (writingStyle === 'type') {
            setTimeout(() => {
                const boldButton = document.querySelector('.ql-bold')
                const italicsButton = document.querySelector('.ql-italic')
                const underlineButton = document.querySelector('.ql-underline')
                const linkButton = document.querySelector('.ql-link')
                const listButtons = document.querySelectorAll('.ql-list')
                const clearButton = document.querySelector('.ql-clean')
                if (boldButton) boldButton.innerHTML = `<svg height="800px" width="800px" id="bold-content" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 21.891 21.891" xml:space="preserve">
                    <g>
                        <path style="fill:#010002;" d="M18.266,11.592c-0.446-0.586-1.004-1.075-1.667-1.462c0.407-0.359,0.749-0.762,1.022-1.207
		c0.552-0.897,0.831-1.871,0.831-2.893c0-1.087-0.311-2.138-0.923-3.122c-0.619-0.997-1.487-1.746-2.578-2.224
		C13.9,0.224,12.574,0,10.898,0H3.346C2.859,0,2.464,0.395,2.464,0.883v20.126c0,0.488,0.395,0.882,0.882,0.882h7.675
		c1.348,0,2.513-0.121,3.463-0.363c0.992-0.251,1.838-0.637,2.516-1.145c0.696-0.522,1.28-1.259,1.739-2.19
		c0.456-0.929,0.688-1.944,0.688-3.019C19.427,13.811,19.036,12.607,18.266,11.592z M5.752,3.257c0-0.413,0.334-0.748,0.747-0.748
		h3.407c1.313,0,2.235,0.09,2.817,0.273c0.676,0.212,1.204,0.616,1.571,1.198c0.346,0.55,0.522,1.186,0.522,1.893
		c0,0.756-0.195,1.406-0.582,1.931c-0.388,0.528-0.956,0.906-1.685,1.123c-0.504,0.154-1.279,0.229-2.364,0.229H6.499
		c-0.413,0-0.747-0.335-0.747-0.748C5.752,8.408,5.752,3.257,5.752,3.257z M15.099,17.498c-0.286,0.528-0.664,0.941-1.123,1.226
		c-0.428,0.266-0.955,0.457-1.566,0.566c-0.341,0.063-0.872,0.093-1.666,0.093H6.499c-0.413,0-0.747-0.335-0.747-0.748v-5.861
		c0-0.413,0.334-0.749,0.747-0.749h3.942c1.176,0,2.068,0.106,2.728,0.323c0.733,0.241,1.317,0.67,1.735,1.272
		c0.413,0.595,0.622,1.295,0.622,2.083C15.526,16.371,15.383,16.974,15.099,17.498z"/>
                    </g>
                </svg>`
                if (italicsButton) italicsButton.innerHTML = `<svg fill="#000000" width="800px" height="800px" id="italics-content" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 17.7344 44.7578 L 32.5703 44.7578 C 33.6718 44.7578 34.4453 44.0781 34.4453 42.9766 C 34.4453 41.9219 33.6953 41.2422 32.5938 41.2422 L 27.3203 41.2422 L 33.0156 14.7578 L 38.2656 14.7578 C 39.3672 14.7578 40.1406 14.0781 40.1406 12.9766 C 40.1406 11.9219 39.3906 11.2422 38.2891 11.2422 L 23.4297 11.2422 C 22.3281 11.2422 21.5547 11.9219 21.5547 12.9766 C 21.5547 14.0781 22.3516 14.7578 23.4531 14.7578 L 28.6797 14.7578 L 22.9844 41.2422 L 17.7109 41.2422 C 16.6094 41.2422 15.8594 41.9219 15.8594 42.9766 C 15.8594 44.0781 16.6328 44.7578 17.7344 44.7578 Z" />
                </svg>`
                if (underlineButton) underlineButton.innerHTML = `<svg fill="#000000" width="800px" height="800px" id="underlined-content" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d='M14.41,4.53V4.18h4.66v.36h-.49a1.34,1.34,0,0,0-1.19.65,3,3,0,0,0-.2,1.4v5.33A9.45,9.45,0,0,1,16.78,15a3.85,3.85,0,0,1-1.54,1.87,5.49,5.49,0,0,1-3.13.78,5.89,5.89,0,0,1-3.27-.75,4,4,0,0,1-1.58-2A11.14,11.14,0,0,1,7,11.64V6.5a2.58,2.58,0,0,0-.33-1.59,1.38,1.38,0,0,0-1.08-.38H5V4.18h5.68v.36h-.5A1.3,1.3,0,0,0,9.06,5,2.87,2.87,0,0,0,8.81,6.5v5.73A12.52,12.52,0,0,0,9,14a3.71,3.71,0,0,0,.51,1.54,2.77,2.77,0,0,0,1.06.91,3.68,3.68,0,0,0,1.7.36,4.69,4.69,0,0,0,2.31-.56,3,3,0,0,0,1.39-1.44,8.33,8.33,0,0,0,.37-3V6.5A2.72,2.72,0,0,0,16,5a1.43,1.43,0,0,0-1.12-.43Z' />
                    <path d='M4.93,20V19H19v1Z' />
                </svg>`
                if (linkButton) linkButton.innerHTML = `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                width="800px" height="800px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
           <g>
               <g>
                   <path d="M18.321,69.07c-2.874,0-5.775-0.845-8.31-2.604l-0.534-0.371c-6.614-4.593-8.259-13.712-3.666-20.326l13.931-18.588
                       c2.183-3.146,5.522-5.292,9.361-5.984c3.839-0.694,7.717,0.152,10.921,2.377l0.534,0.37c2.72,1.888,4.735,4.676,5.675,7.85
                       c0.313,1.059-0.291,2.172-1.351,2.485c-1.058,0.311-2.171-0.29-2.485-1.351c-0.691-2.337-2.116-4.308-4.119-5.698l-0.534-0.37
                       c-2.328-1.617-5.146-2.231-7.931-1.727c-2.787,0.503-5.212,2.061-6.828,4.388L9.055,48.108
                       c-3.293,4.744-2.099,11.365,2.704,14.701l0.534,0.371c4.801,3.334,11.423,2.142,14.759-2.66l4.256-6.126
                       c0.631-0.905,1.875-1.129,2.784-0.501c0.906,0.631,1.131,1.877,0.501,2.784l-4.256,6.125C27.504,66.882,22.948,69.07,18.321,69.07
                       z"/>
               </g>
               <g>
                   <path d="M40.297,51.043c-2.877,0-5.784-0.844-8.323-2.606l-0.538-0.375c-2.718-1.888-4.731-4.674-5.669-7.845
                       c-0.313-1.06,0.292-2.172,1.351-2.485c1.063-0.313,2.173,0.291,2.485,1.351c0.69,2.335,2.114,4.305,4.117,5.696l0.538,0.375
                       c4.799,3.332,11.421,2.138,14.757-2.664l13.93-18.59c3.294-4.744,2.1-11.365-2.703-14.701l-0.53-0.365
                       c-2.332-1.621-5.147-2.232-7.936-1.731c-2.787,0.503-5.212,2.061-6.828,4.388l-4.255,6.125c-0.63,0.908-1.876,1.132-2.783,0.502
                       s-1.132-1.876-0.502-2.783l4.255-6.125c2.225-3.205,5.564-5.351,9.404-6.043c3.838-0.691,7.718,0.153,10.922,2.379l0.529,0.365
                       c6.62,4.598,8.264,13.717,3.67,20.33l-13.93,18.59C49.453,48.868,44.914,51.043,40.297,51.043z"/>
               </g>
               <g>
                   <path d="M52.76,33.106c-0.209,0-0.419-0.065-0.599-0.2c-0.442-0.331-0.532-0.958-0.2-1.399l0.548-0.73
                       c0.331-0.442,0.959-0.53,1.399-0.2c0.442,0.331,0.532,0.958,0.2,1.399l-0.548,0.73C53.364,32.969,53.064,33.106,52.76,33.106z"/>
               </g>
               <g>
                   <path d="M55.047,30.056c-0.209,0-0.419-0.065-0.599-0.2c-0.442-0.331-0.532-0.958-0.2-1.399l4.426-5.904
                       c1.061-1.528,1.471-3.414,1.134-5.28c-0.337-1.867-1.38-3.491-2.938-4.572l-0.343-0.237c-0.454-0.315-0.567-0.938-0.253-1.392
                       c0.313-0.454,0.936-0.568,1.392-0.253l0.344,0.238c1.997,1.387,3.334,3.468,3.766,5.86s-0.094,4.81-1.48,6.806l-4.447,5.934
                       C55.651,29.918,55.352,30.056,55.047,30.056z"/>
               </g>
           </g>
           </svg>`
                for (let i = 0; i < listButtons.length; i++) {
                    if (listButtons) listButtons[i].innerHTML = `<svg fill="#000000" width="800px" height="800px" viewBox="-5 -6 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-ordered-list">
                        <path d='M4 1h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 8h9a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0-4h9a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zM.438.845h.72L1.111 3H.65L.7 1.28H.224L.438.845zM.523 5.59l-.45-.053c.011-.244.09-.439.234-.582a.76.76 0 0 1 .556-.214c.139 0 .263.03.37.089a.67.67 0 0 1 .26.258.677.677 0 0 1 .097.342.988.988 0 0 1-.115.435c-.075.153-.211.33-.407.535l-.158.17h.647V7H.014l.015-.231.666-.68c.158-.16.263-.288.313-.382a.531.531 0 0 0 .074-.245.227.227 0 0 0-.067-.17.242.242 0 0 0-.179-.067.233.233 0 0 0-.182.081c-.034.038-.077.132-.131.284zm.982 4.398c.08.106.121.23.121.373a.7.7 0 0 1-.23.528.813.813 0 0 1-.579.215.758.758 0 0 1-.545-.203c-.142-.136-.22-.32-.183-.603l.456.042c.015.101.05.174.1.22.05.045.115.068.194.068.083 0 .15-.026.203-.078a.253.253 0 0 0 .08-.19.256.256 0 0 0-.109-.209c-.075-.06-.187-.09-.386-.143l.046-.401a.622.622 0 0 0 .203-.042.223.223 0 0 0 .092-.077.175.175 0 0 0 .032-.1.142.142 0 0 0-.045-.109.176.176 0 0 0-.127-.044.211.211 0 0 0-.13.044.217.217 0 0 0-.08.113l-.048.035-.444-.056a.703.703 0 0 1 .185-.413.71.71 0 0 1 .53-.217c.189 0 .35.06.479.182a.58.58 0 0 1 .195.436.516.516 0 0 1-.087.29c-.056.085-.136.153-.246.12a.626.626 0 0 1 .323.219z' />
                    </svg>`
                }
                if (clearButton) clearButton.innerHTML = `<svg fill="#000000" id="clear-button" xmlns="http://www.w3.org/2000/svg"
                    width="800px" height="800px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
                    <path d="M45.1,40.9l4.6-4.6c0.4-0.4,0.4-1,0-1.4l-2.8-2.8c-0.4-0.4-1-0.4-1.4,0L41,36.8l-4.3-4.3
	c-0.4-0.4-1-0.4-1.4,0l-2.8,2.8c-0.4,0.4-0.4,1,0,1.4l4.3,4.3l-4.2,4.2c-0.4,0.4-0.4,1,0,1.4l2.8,2.8c0.4,0.4,1,0.4,1.4,0l4.2-4.2
	l4.5,4.5c0.4,0.4,1,0.4,1.4,0l2.8-2.8c0.4-0.4,0.4-1,0-1.4L45.1,40.9z"/>
                    <path d="M4.8,8h10.8l-4.1,23.2c-0.2,1,0.5,1.8,1.4,1.8H18c0.7,0,1.4-0.5,1.5-1.2L23.7,8h11c0.7,0,1.4-0.5,1.5-1.3
	l0.5-3C36.9,2.8,36.2,2,35.2,2h-30C4.5,2,3.9,2.5,3.8,3.3l-0.5,3C3.1,7.2,3.8,8,4.8,8z"/>
                    <path d="M28,38.5c0-0.8-0.7-1.5-1.5-1.5h-23C2.7,37,2,37.7,2,38.5v3C2,42.3,2.7,43,3.5,43h23c0.8,0,1.5-0.7,1.5-1.5
	V38.5z"/>
                </svg>`
            }, 100)
            const editorElement = document.getElementsByClassName('ql-editor')[0]
            if (editorElement) {
                if (currentPostContent && currentPostContent !== '<p><br></p>') {
                    setTimeout(() => {
                        editorElement.innerHTML = currentPostContent
                        setEditorLeft(editorElement.offsetLeft)
                        setEditorPromptDisplay('none')
                    })
                } else {
                    editorElement.addEventListener('keydown', () => {
                        if (editorElement.innerHTML === '<p><br></p>') {
                            setEditorPromptDisplay('block')
                        } else {
                            setEditorPromptDisplay('none')
                        }
                    })
                }
            }
        } else {
            setEditorPromptDisplay('none')
        }
    }, [currentPostContent, writingStyle])

    //Set all Tags effect
    useEffect(() => {
        if (isTagsSuccess) {
            console.log(tags)
            setTagOptions(() => {
                const tagElements = [...tags[0].allTags].sort().map(tag => {
                    return (
                        <option
                            key={tag}
                            value={tag}
                        >{tag}
                        </option>
                    )
                })
                return tagElements
            })
        }
        //eslint-disable-next-line
    }, [tags, isTagsSuccess])

    //Adjust uploaded image and isBlocking effect
    useEffect(() => {
        if (postData.title !== '' || postData.heading !== '' || postData.thumbnail !== '../../Images/placeholder.png' || postData.tags.length > 0 || imageMethod.selectedValue !== '') {
            setIsBlocking(true)
        } else {
            setIsBlocking(false)
        }
        setTimeout(() => {
            if (imageMethod.selectedOption === 'upload' && postData.thumbnail !== '../../Images/placeholder.png') {
                const canvasElem = document.getElementById('uploaded-image')
                setImageWidth(canvasElem.width.toString())
            } else if (imageMethod.selectedOption === 'link' && imageMethod.selectedValue !== '') {
                const imageElement = document.getElementById('image-from-link')
                setTimeout(() => {
                    setImageWidth(imageElement.width.toString())
                }, 100)
            }
        }, 10)
        setTimeout(() => {
            if (postData.thumbnail !== '../../Images/placeholder.png' && imageMethod.selectedOption === 'upload') {
                const canvasElem = document.getElementById('uploaded-image')
                const hiddenImage = document.getElementById('hidden-image')
                const context = canvasElem.getContext("2d")
                const imageRatio = hiddenImage.width / hiddenImage.height
                canvasElem.width = 300 * imageRatio
                canvasElem.height = 300
                setTimeout(() => {
                    context.drawImage(
                        hiddenImage,
                        0,
                        0,
                        canvasElem.width,
                        canvasElem.height
                    )
                    //console.log(canvasElem.toDataURL("image/jpeg", 0.5))
                    postData.thumbnail = canvasElem.toDataURL("image/jpeg", 0.5)
                }, 10)
            }
        })
    }, [postData, imageMethod])

    //Change handler
    const handleChange = (e) => {
        const { name, value } = e.target
        setPostData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    //Submit handler
    const handleSubmit = async () => {
        setWaiting('grid')
        let postContent = ''
        if (writingStyle === 'type') {
            const editorElement = document.getElementsByClassName('ql-editor')[0]
            postContent = editorElement.innerHTML.toString()
        } else {
            postContent = postData.content
        }
        //remove 'background-color' from HTML input text
        const getIndicesOf = (searchStr, str) => {
            var startIndex = 0, 
                index,
                indices = []
            str = str.toLowerCase()
            searchStr = searchStr.toLowerCase()
            while ((index = str.indexOf(searchStr, startIndex)) > -1) {
                indices.push(index)
                startIndex = index + searchStr.length
            }
            return indices
        } 
        var endIndices = getIndicesOf('background-color', postContent)
        if (endIndices.length > 0) {
            const updatedContent = []
            for (let i = 0; i < endIndices.length; i++) {
                let currentStartIndex
                if (i === 0) {
                    currentStartIndex = 0
                } else {
                    currentStartIndex = postContent.substring(endIndices[i - 1], postContent.length).search(';') + endIndices[i - 1] + 1
                }
                updatedContent.push(postContent.substring(currentStartIndex, endIndices[i]))
            }
            postContent = updatedContent.join('')
        }
        const validContent = postContent !== '<p><br></p>' && postContent !== ''
        const canSave = [postData.title, validContent, postData.tags.length > 0].every(Boolean) && !isLoading
        if (canSave) {
            try {
                const result = await createPost({
                    ...postData,
                    content: postContent,
                    authorId: userId,
                    authorName: token ? jwtDecode(token).UserInfo.username : '',
                    thumbnail: imageMethod.selectedOption === 'upload' ? postData.thumbnail : imageMethod.selectedValue
                })
                console.log(result)
                if (result?.data?.searchField) {
                    window.sessionStorage.removeItem('postTitle')
                    window.sessionStorage.removeItem('postHeading')
                    window.sessionStorage.removeItem('postContent')
                    window.sessionStorage.removeItem('postImgDesc')
                    window.sessionStorage.removeItem('postImgCred')
                    window.sessionStorage.removeItem('postTags')
                    window.sessionStorage.removeItem('postInsPost')
                    window.sessionStorage.removeItem('postThumbnail')
                    window.sessionStorage.removeItem('postImage')
                    window.sessionStorage.removeItem('imageMethod')
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'Publicación creada correctamente.',
                            display: 'grid',
                            image: '../../Images/success.gif'
                        }
                    })
                    setTimeout(() => {
                        navigate(`/post/${result.data.searchField}`)
                    }, 2000)
                } else {
                    console.log(result)
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
            if (!postData.title) {
                setTimeout(() => {
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'La publicación requiere un título.',
                            display: 'grid',
                            confirmButton: 'block',
                        }
                    })
                }, 10)
            } else if (!validContent) {
                setTimeout(() => {
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'Agregar contenido principal.',
                            display: 'grid',
                            confirmButton: 'block',
                        }
                    })
                }, 10)
            } else if (postData.tags.length === 0) {
                setTimeout(() => {
                    setResultMessage((prevState) => {
                        return {
                            ...prevState,
                            message: 'Agregar al menos una etiqueta.',
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
                width: 'auto',
                height: '300px',
                marginBottom: '20px',
                display: 'grid'
            }}>
            {imageMethod.selectedOption === 'upload' && <img
                src={postData.thumbnail}
                alt=""
                id="hidden-image"
                style={{
                    display: postData.thumbnail !== '../../Images/placeholder.png' ? 'none' : 'block',
                    width: 'auto',
                    height: '300px',
                    opacity: '0.8',
                    justifySelf: 'center'
                }}
            />}
            {imageMethod.selectedOption === 'upload' && <canvas
                id="uploaded-image"
                style={{
                    display: postData.thumbnail !== '../../Images/placeholder.png' ? 'block' : 'none',
                    width: 'auto',
                    height: '300px',
                    justifySelf: 'center'
                }}
            ></canvas>}
            {imageMethod.selectedOption === 'link' && <img
                src={imageMethod.selectedValue !== '' ? imageMethod.selectedValue :  '../../Images/placeholder.png'}
                alt=""
                id="image-from-link"
                style={{
                    display: 'block',
                    width: 'auto',
                    height: '300px',
                    opacity: imageMethod.selectedValue === '' ? '0.8' : '1',
                    justifySelf: 'center'
                }}
            />}
            <div
                style={{
                    display: (imageMethod.selectedOption === 'upload' && postData.thumbnail !== '../../Images/placeholder.png') || (imageMethod.selectedOption === 'link' && imageMethod.selectedValue !== '') ? 'grid' : 'none',
                    width: `${imageWidth}px`,
                    height: '30px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    position: 'absolute',
                    textAlign: 'right',
                    fontSize: '25px',
                    justifySelf: 'center',
                    alignSelf: 'end'
                }}>
                <p
                    onClick={() => {
                        if (imageMethod.selectedOption === 'upload') {
                            setPostData((prevState) => {
                                return {
                                    ...prevState,
                                    thumbnail: '../../Images/placeholder.png'
                                }
                            })
                        } else {
                            setImageMethod((prevState) => {
                                return {
                                    ...prevState,
                                    selectedValue: ''
                                }
                            })
                        }
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
            <a href={`${baseUrl.frontend}/user/${userId}`} id="new-post-back"><div>➜</div> Atrás</a>
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
                <label className="new-post-label" ref={topRef}>Contenido principal:</label>
                <select id="writing-select" defaultValue="type" onChange={(e) => setWritingStyle(e.target.value)}>
                    <option value="type">Edición libre</option>
                    <option value="html-input">HTML</option>
                </select>
                <p style={{position: 'absolute', left: `${editorLeft}px`, top: '560px', fontSize: '20px', opacity: '0.5', display: editorPromptDisplay}}>Escribe aquí</p>
                {writingStyle === 'type' && <Editor
                    defaultValue={new Delta()}
                    ref={quillRef}
                />}
                {writingStyle === 'html-input' && <textarea
                    id="new-post-content"
                    name="content"
                    placeholder="Ingresar contenido HTML"
                    value={postData.content}
                    onChange={handleChange}
                ></textarea>}
                <label htmlFor="new-post-image" className="new-post-label">Imagen:</label>
                <select onChange={(e) => setImageMethod((prevState) => {
                    return {
                        ...prevState,
                        selectedOption: e.target.value
                    }
                })} defaultValue="link" id="image-method-select">
                    <option value="link">Agregar enlace de imagen</option>
                    <option value="upload">Subir archivo de imagen</option>
                </select>
                {imageMethod.selectedOption === 'upload' && <input
                    id="new-post-image"
                    name="new-post-image"
                    type="file"
                    accept="image/*"
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
                            setResultMessage((prevState) => {
                                return {
                                    ...prevState,
                                    message: error,
                                    display: 'grid',
                                    confirmButton: 'block',
                                }
                            })
                        }
                    }}
                />}
                {imageMethod.selectedOption === 'link' && <input
                    id="image-link-input"
                    type="text"
                    value={imageMethod.selectedValue}
                    onChange={(e) => setImageMethod((prevState) => {
                        return {
                            ...prevState,
                            selectedValue: e.target.value
                        }
                    })}
                    placeholder="Enlace de imagen"
                />}
                {pictureElement}
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
                <label htmlFor="new-post-insPost" className="new-post-label">Publicación en Instagram:</label>
                <input
                    id="new-post-insPost"
                    name="insPost"
                    type="text"
                    className="new-post-input"
                    placeholder="Enlace a Instagram"
                    value={postData.insPost}
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
                    <button id="add-tag-confirm" style={{display: addingTag ? 'block': 'none'}} onClick={async (e) => {
                        e.preventDefault()
                        const newTag = newTagRef.current.value
                        if (newTag !== '') {
                            const result = await addTag(newTag)
                            if (result?.data?.allTags) {
                                setPostData((prevState) => {
                                    const updatedTags = [...prevState.tags]
                                    if (!updatedTags.includes(newTag)) updatedTags.push(newTag)
                                    return {
                                        ...prevState,
                                        tags: updatedTags
                                    }
                                })
                                setTagOptions(() => {
                                    const tagElements = result.data.allTags.map(tag => {
                                        return (
                                            <option
                                                key={tag}
                                                value={tag}
                                            >{tag}
                                            </option>
                                        )
                                    })
                                    return tagElements
                                })
                                newTagRef.current.value = ''
                                setAddingTag(false)
                            } else {
                                setResultMessage((prevState) => {
                                    return {
                                        ...prevState,
                                        message: result.data.message,
                                        display: 'grid',
                                        confirmButton: 'block'
                                    }
                                })
                            }
                        } else {
                            setAddingTag(false)
                        }
                    }}>✓</button>
                </div>
                <div id="tag-elements-container">
                    {postData.tags.length === 0 ? (<span style={{opacity: '0.5', fontSize: '20px'}}>Las etiquetas se mostrarán aquí</span>) : selectedTagsElements}
                </div>
            </form>
            <div id="new-post-buttons">
                <a href={`${baseUrl.frontend}/user/${userId}`} id="new-post-cancel">Cancelar</a>
                <button id="new-post-submit" onClick={handleSubmit}>Publicar</button>
            </div>
            <div id="post-result-container" style={{display: resultMessage.display}}>
                <div className="result-container" style={{animation: resultMessage.animation}}>
                    <img src={resultMessage.image} alt="" id="post-result-image"/>
                    <p id="post-result-message">{resultMessage.message}</p>
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

export default NewPost