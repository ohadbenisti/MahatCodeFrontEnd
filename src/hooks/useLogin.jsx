import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"

const useLogin = (path) => {
    const { userInfo } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate(path || '/login')
        }
    }, [])
    return userInfo
}

export default useLogin
