import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import LoadingIcon from "../../components/LoadingIcon"

const PersistLogin = () => {

    const persist = JSON.parse(localStorage.getItem("persist")) || false
    const token = useSelector(selectCurrentToken)
    const session = window.sessionStorage.getItem('session')
    const isTemp = window.localStorage.getItem('isTemp')
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
                    if (result?.error?.originalStatus === 403) {
                        if (!isTemp) window.localStorage.setItem('isTemp', 'y')
                    } else {
                        window.sessionStorage.setItem('session', 'actv')
                        window.localStorage.removeItem('isTemp')
                    }
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
            if (!persist && session) verifyRefreshToken()
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