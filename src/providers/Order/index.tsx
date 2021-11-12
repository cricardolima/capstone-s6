import { useToast } from "@chakra-ui/toast";
import { useContext, createContext, ReactNode, useState } from "react";
import api from "../../services/api";

interface IOrderProvidertData {
    userOrders: IOrderData[];
    companyOrders: IOrderData[];
    unpickedOrders: IOrderData[];
    newOrder: (body: IOrderData) => void;
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

const OrderContext = createContext<IOrderProvidertData>({} as IOrderProvidertData)

export const OrderProvider = ({children}: IOrderProviderProps) => {
    const [allOrders, setAllOrders] = useState<IOrderData[]>([]);
    const [userOrders, setUserOrders] = useState<IOrderData[]>([]);
    const [companyOrders, setCompanyOrders] = useState<IOrderData[]>([]);
    const [unpickedOrders, setUnpickedOrders] = useState<IOrderData[]>([]);

    const toast = useToast()

    const getToken = () => JSON.parse(`${localStorage.getItem("@conserta:accessToken")}`) as string;

    const getUserInfo = () => JSON.parse(`${localStorage.getItem("@conserta:user")}`) as User;

    const getBearer = () => `Bearer ${getToken()}` as string;

    const getAllOrders = () => {
        api.get(`/order`,{ headers:{ Authorization: getBearer()}})
        .then(({data}) => setAllOrders(data))
        .catch(()=> console.log("Deu Ruim"))
    }

    const newOrder = (body: IOrderData) => {
        api.post("/orders", body,{ headers:{ Authorization: getBearer()}})
        .then(() => {
            getAllOrders();
            getUserOrders();
            getUnpickedOrders();
            toast({title:"Deu Show", status:"success", isClosable:true});
        })
        .catch(()=> toast({title:"Deu Ruim", status:"error", isClosable:true}))
    }

    const getUserOrders = () => {

        const {type} = getUserInfo();

        let filteredOrders: IOrderData[];

        if ( type === "user" ) {
            filteredOrders = allOrders.filter( ({userId}) => userId === getUserInfo().id );

            setUserOrders(filteredOrders);
        } else {
            filteredOrders = allOrders.filter( ({pickedUpBy}) => pickedUpBy === getUserInfo().id );

            setCompanyOrders(filteredOrders);
        }
    }

    const getUnpickedOrders = () => {

        const {type} = getUserInfo();

        if ( type === "company" ) {
        const filteredOrders: IOrderData[] = allOrders.filter( ({pickedUpBy}) => pickedUpBy !== getUserInfo().id );

        setUnpickedOrders(filteredOrders);
        }
    }

    const data = {
        userOrders,
        companyOrders,
        unpickedOrders,
        newOrder,
    }

    return (
        <OrderContext.Provider value={data} {...{children}} />
    )
}

export const useOrder = () => useContext(OrderContext)