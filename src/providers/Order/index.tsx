import { useContext, createContext } from "react";

interface IOrderProvidertData {}

const orderContext = createContext<IOrderProvidertData>({} as IOrderProvidertData)



export const useOrder = () => useContext(orderContext)