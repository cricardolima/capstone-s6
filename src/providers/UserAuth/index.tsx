import React, {useCallback} from "react"
import { createContext, ReactNode, useContext, useState } from 'react'
import {useHistory} from "react-router-dom"
import api from "../../services/api";
import {useToast} from "@chakra-ui/react"

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
    registerUser: (credentials: RegisterUser) => Promise<void>,
    registerCompany: (credentials: RegisterCompany) => Promise<void>,
}

interface SignInCredentials {
    email: string,
    password: string
}
interface RegisterUser{
    name: string;
    email: string;
    password: string;
    type: string;
    cpf: string;
}
interface RegisterCompany{
    name: string | null;
    company_name: string;
    cnpj: string;
    address: string;
    email: string;
    password: string;
    type: string;
    phone: string
}

const UserAuthContext = createContext<UserAuthData>({} as UserAuthData)


export const UserAuthProvider = ({ children }: UserAuthProps) => {
    const history = useHistory();
    const toast = useToast();

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

    const registerUser = useCallback(async ({name, email, password}: RegisterUser) => {
                        await 
                            api.post("/register", {name, email, password})
                            .then((response)=> {
                                toast({
                                    position:'top',
                                    title:"Sucesso ao se Cadastrar!",
                                    description:"Faça login para acessar ao sistema.",
                                    status: "success",
                                    duration : 5000,
                                    isClosable : true,
                                })
                              history.push("/login")
                            })
                            .catch((error)=>{
                                toast({
                                    position:'top',
                                    title:"Erro ao se Cadastrar!",
                                    description:"Tente novamente ou contate o suporte!",
                                    status: "error",
                                    duration : 5000,
                                    isClosable : true,
                                })
                            })
    }, [toast,history])

    const registerCompany = useCallback(async ({name,company_name,cnpj,address, email, password,type,phone}: RegisterCompany) => {
        await 
            api.post("/register", {name,company_name,cnpj,address, email, password,type,phone})
            .then((response)=> {
                toast({
                    position:'top',
                    title:"Sucesso ao se Cadastrar!",
                    description:"Faça login para acessar ao sistema.",
                    status: "success",
                    duration : 5000,
                    isClosable : true,
                })
              history.push("/login")
            })
            .catch((error)=>{
                toast({
                    position:'top',
                    title:"Erro ao se Cadastrar!",
                    description:"Tente novamente ou contate o suporte!",
                    status: "error",
                    duration : 5000,
                    isClosable : true,
                })
            })
}, [toast,history])

    return (
        <UserAuthContext.Provider value={{ user: data.user,signIn,accessToken: data.accessToken,registerUser,registerCompany }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserAuth = () => useContext(UserAuthContext)