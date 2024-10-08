import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let status
    let currentUserId
    let currentUsername

    if (token) {
        const decoded = jwtDecode(token)
        const { id, username, roles } = decoded.UserInfo
        currentUsername = username
        currentUserId = id
        status = "User"
        if (roles.includes('Editor')) status = "Editor"
        if (roles.includes('Admin')) status = "Admin"
    }

    return { currentUserId, currentUsername, status }
}
export default useAuth