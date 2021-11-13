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
  rateOrder: (orderId: number, data: IRatingData) => void;
  checkoutOrder: (orderId: number, data: ICheckoutData) => void;
  deleteOrder: (orderId: number) => void;
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

interface IPickedUpByData {
  id: number;
  company_name: string;
}

export interface IOrderBody {
  title: string;
  description: string;
  vehicle: IVehicleData;
  address: string;
  status: "pending" | "in_progress" | "concluded" | "sent_to_rescue";
  pickedUpBy?: IPickedUpByData; // informaçções da empresa que pegou a ordem
  diagnostic?: string;
  rating?: IRatingData;
  userId: number;
}

export interface ICheckoutData
  extends Pick<IOrderBody, "status" | "diagnostic"> {}

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
  pickedUpBy?: IPickedUpByData;
  rating?: IRatingData;
  diagnostic?: string;
}

interface IUpdateParams {
  orderId: number;
  body: IUpdateOrderBody;
  successMessage: string;
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
      filteredOrders = allOrders.filter(
        ({ pickedUpBy }) => pickedUpBy?.id === id
      );

      setCompanyOrders(filteredOrders);
    }
  };

  const getUnpickedOrders = () => {
    const { type, id } = getUserInfo();

    if (type === "company") {
      const filteredOrders: IOrderBody[] = allOrders.filter(
        ({ pickedUpBy }) => pickedUpBy?.id !== id
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

  const updateOrder = (updateParams: IUpdateParams) => {
    const { orderId, body, successMessage } = updateParams;

    const endpoint: string = `${mainEndpoint}/${orderId}`;

    api
      .patch(endpoint, body, authorization())
      .then(() => {
        updateStates();
        toast({
          title: successMessage,
          status: "success",
          isClosable: true,
        });
      })
      .catch(({ response }) => {
        toast({ title: response.data, status: "error", isClosable: true });
      });
  };

  const pickupOrder = (orderId: number) => {
    const { id, company_name } = getUserInfo();

    const body: IUpdateOrderBody = {
      pickedUpBy: { id, company_name },
    };

    const updateParams: IUpdateParams = {
      orderId,
      body,
      successMessage: "Ordem criada com sucesso!",
    };

    updateOrder(updateParams);
  };

  const rateOrder = (orderId: number, data: IRatingData) => {
    const body: IUpdateOrderBody = {
      rating: data,
    };

    const updateParams: IUpdateParams = {
      orderId,
      body,
      successMessage: "Obrigado pela avaliação!",
    };

    updateOrder(updateParams);
  };

  const checkoutOrder = (orderId: number, data: ICheckoutData) => {
    const body: IUpdateOrderBody = {
      ...data,
    };

    const updateParams: IUpdateParams = {
      orderId,
      body,
      successMessage: "Ordem fechada!",
    };

    updateOrder(updateParams);
  };

  const deleteOrder = (orderId: number) => {
    const endpoint: string = `${mainEndpoint}/${orderId}`;

    api
      .delete(endpoint, authorization())
      .then(() => {
        updateStates();
        toast({
          title: "Ordem deletada!",
          status: "success",
          isClosable: true,
        });
      })
      .catch(({ response }) => {
        toast({ title: response.data, status: "error", isClosable: true });
      });
  };

  const data = {
    userOrders,
    companyOrders,
    unpickedOrders,
    newOrder,
    pickupOrder,
    rateOrder,
    checkoutOrder,
    deleteOrder,
  };

  return <OrderContext.Provider value={data} {...{ children }} />;
};

export const useOrder = () => useContext(OrderContext);
