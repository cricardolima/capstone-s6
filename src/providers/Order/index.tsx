import { useToast } from "@chakra-ui/toast";
import { useContext, createContext, ReactNode, useState } from "react";
import api from "../../services/api";
import {AxiosRequestConfig} from "axios"

interface IOrderProvidertData {
    userOrders: IOrderData[];
    companyOrders: IOrderData[];
    unpickedOrders: IOrderData[];
    newOrder: (body: IOrderData) => void;
    pickupOrder: (orderId: number) => void;
}

interface IOrderProviderProps {
    children: ReactNode;
}

export interface IRatingData {
    rate: number;
    commentary: string
}

interface IVehicleData {
    model: string;
    year: number
}

export interface IOrderData {
    title: string;
    description: string;
    address: string;
    rating: IRatingData,
    status: "pending" | "in_progress" | "concluded" | "sent_to_rescue",
    vehicle: IVehicleData,
    pickedUpBy?: number   // id da empresa que pegou a ordem
    userId: number,
}

interface User  {
    email: string;
    name: string;
    company_name:string;
    cpf_cnpj?:string;
    address?: string;
    id: number;
    type: "user" | "company";
    phone?: string
}

export interface IUpdateOrderBodyData {
    pickedUpBy?: number
}

const OrderContext = createContext<IOrderProvidertData>({} as IOrderProvidertData)

export const OrderProvider = ({children}: IOrderProviderProps) => {
    const [allOrders, setAllOrders] = useState<IOrderData[]>([]);
    const [userOrders, setUserOrders] = useState<IOrderData[]>([]);
    const [companyOrders, setCompanyOrders] = useState<IOrderData[]>([]);
    const [unpickedOrders, setUnpickedOrders] = useState<IOrderData[]>([]);

    const toast = useToast()

    const mainEndpoint: string = `/orders`;

    const getToken = () => JSON.parse(`${localStorage.getItem("@conserta:accessToken")}`) as string;

    const getUserInfo = () => JSON.parse(`${localStorage.getItem("@conserta:user")}`) as User;

    const getBearer = () => `Bearer ${getToken()}` as string;

    const authorization = () => ({ headers:{ Authorization: getBearer()}}) as AxiosRequestConfig

    const getAllOrders = () => {
        api.get(mainEndpoint,{ headers:{ Authorization: getBearer()}})
        .then(({data}) => setAllOrders(data))
        .catch(()=> console.log("Deu Ruim"))
    }

    const getUserOrders = () => {
        const {type, id} = getUserInfo();

        let filteredOrders: IOrderData[];

        if ( type === "user" ) {
            filteredOrders = allOrders.filter( ({userId}) => userId === id );

            setUserOrders(filteredOrders);
        };
        
        if ( type === "company" ) {
            filteredOrders = allOrders.filter( ({pickedUpBy}) => pickedUpBy === id );

            setCompanyOrders(filteredOrders);
        }
    }

    const getUnpickedOrders = () => {
        const {type, id} = getUserInfo();

        if ( type === "company" ) {
        const filteredOrders: IOrderData[] = allOrders.filter( ({pickedUpBy}) => pickedUpBy !== id );

        setUnpickedOrders(filteredOrders);
        }
    }

    const updateStates = () => {
        getAllOrders();
        getUserOrders();
        getUnpickedOrders();
    }

    const newOrder = (body: IOrderData) => {
        api.post(mainEndpoint, body,{ headers:{ Authorization: getBearer()}})
        .then(() => {
            updateStates();
            toast({title:"Deu Show", status:"success", isClosable:true});
        })
        .catch(()=> toast({title:"Deu Ruim", status:"error", isClosable:true}))
    }

    const updateOrder = (data: IUpdateOrderBodyData) => {

    }

    const pickupOrder = (orderId: number) => {
        const {id} = getUserInfo();

        const endpoint: string = mainEndpoint + `/${orderId}`

        const data: IUpdateOrderBodyData = {
            pickedUpBy: id
        }

        api.patch(endpoint, data, authorization())
        .then( () => {
            updateStates();
            toast({title:"Deu Show", status:"success", isClosable:true});
        })
        .catch(()=> toast({title:"Deu Ruim", status:"error", isClosable:true}))
    }

    const data = {
        userOrders,
        companyOrders,
        unpickedOrders,
        newOrder,
        pickupOrder
    }

    return (
        <OrderContext.Provider value={data} {...{children}} />
    )
}

export const useOrder = () => useContext(OrderContext)