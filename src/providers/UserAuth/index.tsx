import React, {useCallback} from "react"
import { createContext, ReactNode, useContext, useState } from 'react'
import api from "../../services/api";

interface User  {
    email: string,
    name: string,
    company_name:string,
    cpf?: string,
    cnpj?:string,
    address: string,
    id: number
}

interface Response {
    accessToken: string,
    user: User
}

interface UserAuthProps {
    children: ReactNode
}

interface UserAuthData {
    user: User,
    accessToken: string,
    signIn: (credentials: SignInCredentials) => Promise<void>,
}

interface SignInCredentials {
    email: string,
    password: string
}

const UserAuthContext = createContext<UserAuthData>({} as UserAuthData)

export const UserAuthProvider = ({ children }: UserAuthProps) => {

    const [data, setData] = useState<Response>(() => {
        const accessToken = localStorage.getItem("@conserta:accessToken")
        const user = localStorage.getItem("@conserta:user")

        if (accessToken && user) {
            return {accessToken, user: JSON.parse(user)}
        }

        return {} as Response
    })

    const signIn = useCallback(async ({email, password}: SignInCredentials) => {
        const response = await api.post("/login", {email, password})

        const {accessToken, user} = response.data

        localStorage.setItem("@conserta:accessToken", accessToken)
        localStorage.setItem("@conserta:user", JSON.stringify(user))

        setData({accessToken, user})
    }, [])

    return (
        <UserAuthContext.Provider value={{ user: data.user,signIn,accessToken: data.accessToken }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserAuth = () => useContext(UserAuthContext)