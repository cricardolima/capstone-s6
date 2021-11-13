import * as React from "react";
import { useToast } from "@chakra-ui/toast";
import { useContext, createContext, ReactNode, useState } from "react";
import api from "../../services/api";
import { AxiosRequestConfig } from "axios";

interface IOrderProvidertData {
  userOrders: IOrderBody[];
  companyOrders: IOrderBody[];
  unpickedOrders: IOrderBody[];
  newOrder: (data: IOrderData) => void;
  pickupOrder: (orderId: number) => void;
}

interface IOrderProviderProps {
  children: ReactNode;
}

export interface IRatingData {
  rate: number;
  commentary: string;
}

interface IVehicleData {
  model: string;
  year: number;
}

export interface IOrderBody {
  title: string;
  description: string;
  vehicle: IVehicleData;
  address: string;
  status: "pending" | "in_progress" | "concluded" | "sent_to_rescue";
  pickedUpBy?: number; // id da empresa que pegou a ordem
  diagnostic?: string;
  rating?: IRatingData;
  userId: number;
}

export interface IOrderData
  extends Omit<IOrderBody, "rating" | "status" | "pickedUpBy" | "userId"> {}

interface User {
  email: string;
  name: string;
  company_name: string;
  cpf_cnpj?: string;
  address?: string;
  id: number;
  type: "user" | "company";
  phone?: string;
}

export interface IUpdateOrderBody {
  pickedUpBy?: number;
  rating?: IRatingData;
  diagnostic?: string;
}

const OrderContext = createContext<IOrderProvidertData>(
  {} as IOrderProvidertData
);

export const OrderProvider = ({ children }: IOrderProviderProps) => {
  const [allOrders, setAllOrders] = useState<IOrderBody[]>([]);
  const [userOrders, setUserOrders] = useState<IOrderBody[]>([]);
  const [companyOrders, setCompanyOrders] = useState<IOrderBody[]>([]);
  const [unpickedOrders, setUnpickedOrders] = useState<IOrderBody[]>([]);

  const toast = useToast();

  const mainEndpoint: string = `/orders`;

  const getToken = () => {
    const token: string | null = localStorage.getItem("@conserta:accessToken");

    return JSON.parse(`${token}`);
  };

  const getUserInfo = () =>
    JSON.parse(`${localStorage.getItem("@conserta:user")}`) as User;

  const getBearer = () => `Bearer ${getToken()}`;

  const authorization = () =>
    ({ headers: { Authorization: getBearer() } } as AxiosRequestConfig);

  const getAllOrders = () => {
    api
      .get(mainEndpoint, authorization())
      .then(({ data }) => setAllOrders(data))
      .catch((err) => console.log(err));
  };

  const getCorrespondingOrders = () => {
    const { type, id } = getUserInfo();

    let filteredOrders: IOrderBody[];

    if (type === "user") {
      filteredOrders = allOrders.filter(({ userId }) => userId === id);

      setUserOrders(filteredOrders);
    }

    if (type === "company") {
      filteredOrders = allOrders.filter(({ pickedUpBy }) => pickedUpBy === id);

      setCompanyOrders(filteredOrders);
    }
  };

  const getUnpickedOrders = () => {
    const { type, id } = getUserInfo();

    if (type === "company") {
      const filteredOrders: IOrderBody[] = allOrders.filter(
        ({ pickedUpBy }) => pickedUpBy !== id
      );

      setUnpickedOrders(filteredOrders);
    }
  };

  const updateStates = () => {
    getAllOrders();
    getCorrespondingOrders();
    getUnpickedOrders();
  };

  const newOrder = (data: IOrderData) => {
    const { id } = getUserInfo();

    const body: IOrderBody = {
      ...data,
      status: "pending",
      userId: id,
    };

    api
      .post(mainEndpoint, body, authorization())
      .then(() => {
        updateStates();
        toast({
          title: "Ordem criada com sucesso!",
          status: "success",
          isClosable: true,
        });
      })
      .catch(({ response }) => {
        toast({ title: response.data, status: "error", isClosable: true });
      });
  };

  const updateOrder = (data: IUpdateOrderBody) => {};

  const pickupOrder = (orderId: number) => {
    const { id } = getUserInfo();

    const endpoint: string = `${mainEndpoint}/${orderId}`;

    const data: IUpdateOrderBody = {
      pickedUpBy: id,
    };

    api
      .patch(endpoint, data, authorization())
      .then(() => {
        updateStates();
        toast({ title: "Deu Show", status: "success", isClosable: true });
      })
      .catch(() =>
        toast({ title: "Deu Ruim", status: "error", isClosable: true })
      );
  };

  const data = {
    userOrders,
    companyOrders,
    unpickedOrders,
    newOrder,
    pickupOrder,
  };

  return <OrderContext.Provider value={data} {...{ children }} />;
};

export const useOrder = () => useContext(OrderContext);
