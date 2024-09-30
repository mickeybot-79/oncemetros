import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetFeedbackQuery } from "./pageApiSlice"

const AllFeedback = () => {

    const navigate = useNavigate()

    const token = window.localStorage.getItem('token')

    useEffect(() => {
        const isAdmin = token ? jwtDecode(token).UserInfo.roles.includes('Admin') : false
        if (!isAdmin) navigate('/')
        //eslint-disable-next-line
    }, [])

    const [allFeedback, setAllFeedback] = useState({
        userId: '',
        type: '',
        content: '',
        date: 0
    })

    const {
        data: feedback,
        isSuccess,
        isLoading
    } = useGetFeedbackQuery('feedbackList', {
        pollingInterval: 600000,
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {

    }, [])

    return (
        <div>
            <h3>Comentarios enviados por los usuarios</h3>
        </div>
    )
}

export default AllFeedback