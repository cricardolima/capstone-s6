import * as React from "react";
import { useToast } from "@chakra-ui/toast";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
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
  updateOrderStates: () => void;
}

interface IOrderProviderProps {
  children: ReactNode;
}

export interface IRatingData {
  rate: number;
  commentary: string;
}

export interface IVehicleData {
  model: string;
  year: number;
}

interface IPickedUpByData {
  id: number;
  company_name: string;
}

export interface IOrderBody {
  id?: number;
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
  extends Omit<
    IOrderBody,
    "id" | "rating" | "status" | "pickedUpBy" | "userId"
  > {}

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
  status?: string;
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

  useEffect(() => {
    const fetchData = async () => {
      await getAllOrders();
      //await getCorrespondingOrders();
      //await getUnpickedOrders();
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCorrespondingOrders();
      await getUnpickedOrders();
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allOrders]);

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

  const getAllOrders = async () => {
    await api
      .get(mainEndpoint, authorization())
      .then(({ data }) => setAllOrders(data))
      .catch((err) => console.log(err));
  };

  const getCorrespondingOrders = () => {
    const user = getUserInfo();

    let filteredOrders: IOrderBody[];

    if (user?.type === "user") {
      filteredOrders = allOrders.filter(({ userId }) => userId === user?.id);

      setUserOrders(filteredOrders);
    }

    if (user?.type === "company") {
      filteredOrders = allOrders.filter(
        ({ pickedUpBy }) => pickedUpBy?.id === user?.id
      );

      setCompanyOrders(filteredOrders);
    }
  };

  const getUnpickedOrders = () => {
    const user = getUserInfo();

    if (user?.type === "company") {
      const filteredOrders: IOrderBody[] = allOrders.filter(
        ({ pickedUpBy }) => pickedUpBy?.id !== user?.id
      );

      setUnpickedOrders(filteredOrders);
    }
  };

  const updateOrderStates = async () => {
    await getAllOrders();
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
        updateOrderStates();
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
        updateOrderStates();
        toast({
          position: "top",
          title: successMessage,
          status: "success",
          isClosable: true,
        });
      })
      .catch(({ response }) => {
        toast({
          position: "top",
          title: response.data,
          status: "error",
          isClosable: true,
        });
      });
  };

  const pickupOrder = (orderId: number) => {
    const { id, company_name } = getUserInfo();

    const body: IUpdateOrderBody = {
      pickedUpBy: { id, company_name },
      status: "in_progress"
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
        updateOrderStates();
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
    updateOrderStates,
  };

  return <OrderContext.Provider value={data} {...{ children }} />;
};

export const useOrder = () => useContext(OrderContext);
