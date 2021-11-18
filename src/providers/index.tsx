import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { UserAuthProvider } from "./UserAuth";
import React from "react";
import { OrderProvider } from "./Order";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <OrderProvider>
        <UserAuthProvider>{children}</UserAuthProvider>
      </OrderProvider>
    </ChakraProvider>
  );
};
