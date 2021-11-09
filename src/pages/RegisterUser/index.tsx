import { Flex, Text, Box, Img } from "@chakra-ui/react";
import React from "react";
import register from "../../assets/registerUser.svg";
import { ButtonBack } from "../../components/ButtonBack";

export const RegisterUser = () => {
  return (
    <Flex
      height="100vh"
      bgGradient="linear(to-r, baseDefault 50%, secondary 50%)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex width="90%" justifyContent="flex-start" alignItems="flex-start">
          <ButtonBack />
        </Flex>
        <Box>
          <Img src={register} alt="Registro de Usuário" />
        </Box>
        <Text fontSize="4xl" fontWeight="bold">
          O jeito fácil, grátis
        </Text>
        <Text fontSize="xl">
          flexível e atrativo de gerenciar seus projetos em uma única plataforma
        </Text>
      </Flex>

      <Flex border="1px solid black" flex="1" justifyContent="center">
        <Text>Direita</Text>
      </Flex>
    </Flex>
  );
};
