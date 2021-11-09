import { Flex, Text, Box, Img, Stack, Input, Button } from "@chakra-ui/react";
import React from "react";
import register from "../../assets/registerUser.svg";
import { ButtonBack } from "../../components/Buttons/ButtonBack";

export const RegisterUser = () => {
  return (
    <Flex
      width="100%"
      padding="10px 0px"
      height={["", "100vh", "100vh"]}
      flexDirection={["column", "column", "row"]}
      justifyContent="center"
      alignItems="center"
      bgGradient={[
        "linear(to-t, secondary 50%,baseDefault 50%)",
        "linear(to-t, secondary 50%,baseDefault 50%)",
        "linear(to-r, baseDefault 50%, secondary 50%)",
      ]}
    >
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        paddingBottom="35px"
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
        <Text fontSize="xl" textAlign="center">
          flexível e atrativo de gerenciar seus projetos em uma única plataforma
        </Text>
      </Flex>
      <Flex flex="1" justifyContent="center">
        <Stack
          width="95%"
          maxWidth="500px"
          bgColor="baseDefault"
          spacing={4}
          boxSizing="border-box"
          padding={["20px", "50px", "50px"]}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
        >
          <Flex
            width="100%"
            flexDirection={["column", "row", "row"]}
            margin="0 auto"
          >
            <Flex flex="1" justifyContent="center" alignItems="center">
              logo
            </Flex>
            <Flex flex="2" justifyContent="center">
              <Text fontSize={["lg", "2xl", "2xl"]} fontWeight="bold">
                Cadastro de Usuário
              </Text>
            </Flex>
          </Flex>
          <Text as="label" fontSize="sm">
            Nome Completo
            <Input placeholder="Digite seu nome" padding="30px" />
          </Text>

          <Text as="label" fontSize="sm">
            Seu Email
            <Input placeholder="Digite seu email" padding="30px" />
          </Text>

          <Text as="label" fontSize="sm">
            Sua Senha
            <Input
              placeholder="Digite sua senha"
              type="password"
              padding="30px"
            />
          </Text>

          <Text as="label" fontSize="sm">
            Confirme sua Senha
            <Input
              placeholder="Confirme sua senha"
              type="password"
              padding="30px"
            />
          </Text>
          <Button
            width="100%"
            padding="30px"
            color="baseDefault"
            bgColor="secondary"
            _hover={{ bgColor: "primary" }}
          >
            Cadastrar
          </Button>
          <Text textAlign="center">
            É empresa? clique aqui para se cadastrar!
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};
