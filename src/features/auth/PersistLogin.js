import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import LoadingIcon from "../../components/LoadingIcon"

const PersistLogin = () => {

    const persist = JSON.parse(localStorage.getItem("persist")) || false
    const token = useSelector(selectCurrentToken)
    const logged = window.sessionStorage.getItem('logged')
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

            const verifyRefreshToken = async () => {
                try {
                    const result = await refresh()
                    if (result?.error?.originalStatus === 403 || result?.error?.originalStatus === 401) {
                        window.sessionStorage.removeItem('logged')
                    } else {
                        window.sessionStorage.setItem('logged', 'y')
                    }
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (persist || logged) {
                setTimeout(() => {
                    verifyRefreshToken()
                }, 100)
            }
            setTrueSuccess(true)
        }   

        return () => effectRan.current = true
        //eslint-disable-next-line
    }, [])

    let content

    if (isLoading && !trueSuccess) {
        content = (
            <div className="page-container">
                <img src='../Images/background.jpg' alt='background-image' id='background-image' />
                <LoadingIcon />
            </div>
        )
    } else if (isError) {
        console.log(error.message)
        content = <Outlet />
    } else if (trueSuccess) {
        content = <Outlet />
    } else if (token && isUninitialized) {
        content = <Outlet />
    }

    return content

}

export default PersistLogin