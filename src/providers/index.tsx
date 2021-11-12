import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { UserAuthProvider } from "./UserAuth";
import React from "react";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
      <ChakraProvider theme={theme}>
          <UserAuthProvider>
              {children}
          </UserAuthProvider>
        </ChakraProvider>
  );
};
