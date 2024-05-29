import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import { useNavigate, useLocation } from "react-router-dom"

const useLogin = (path) => {
    const { userInfo } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!userInfo) {
            navigate(path || '/login')
        } else if (userInfo.data.user.role !== 'admin' && location.pathname === "/admin") {
            navigate('/')
        }
    }, [userInfo, path])
    return userInfo
}

export default useLogin
