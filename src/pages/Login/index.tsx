import {
  Flex,
  Text,
  Box,
  Img,
  Stack,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import loginSvg from "../../assets/login.svg";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";

import { Link } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

interface SingInData {
  email: string;
  password: string;
}
const registerUserSchema = yup.object().shape({
  email: yup.string().required("Email Obrigatório").email("Email inválido"),
  password: yup.string().required("Senha Obrigatório"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerUserSchema) });
  const handleSingIn = (data: SingInData) => {
    console.log(data);
  };
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
        "linear(to-r, secondary 50%,baseDefault 50%,)",
      ]}
    >
      <Flex
        flex="1"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          width="90%"
          padding="10px 0px"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <ButtonBack />
        </Flex>
        <Stack
          as="form"
          onSubmit={handleSubmit(handleSingIn)}
          width="95%"
          maxWidth="500px"
          bgColor="baseDefault"
          spacing={4}
          boxSizing="border-box"
          padding={["20px", "50px", "50px"]}
          boxShadow="0px 4px 8px 4px rgba(0, 0, 0, 0.25);"
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
                Login
              </Text>
            </Flex>
          </Flex>

          <Box w="100%">
            <Input
              placeholder="Email"
              label={"Email :"}
              type="email"
              error={errors.email}
              {...register("email")}
            />
            {!errors.email && (
              <Text ml="1" mt="1" color="secondary">
                Exemplo : nome@email.com
              </Text>
            )}
          </Box>

          <Box w="100%">
            <Input
              placeholder="Senha"
              label={"Senha :"}
              type="password"
              error={errors.password}
              {...register("password")}
            />
            {!errors.password && (
              <Text ml="1" mt="1" color="secondary">
                A senha deve ter...
              </Text>
            )}
          </Box>
          <Button
            width="100%"
            padding="30px"
            color="baseDefault"
            bgColor="secondary"
            _hover={{ bgColor: "primary" }}
            type="submit"
          >
            Entrar
          </Button>
          <Text textAlign="center">
            Não possui conta?{" "}
            <ChakraLink as={Link} color="secondary" to="/registerUser">
              clique aqui
            </ChakraLink>{" "}
            para se cadastrar!
          </Text>
        </Stack>
      </Flex>
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        paddingBottom="35px"
      >
        <Box>
          <Img src={loginSvg} alt="Registro de Usuário" />
        </Box>
        <Text fontSize="4xl" fontWeight="bold">
          O jeito fácil, grátis
        </Text>
        <Text fontSize="xl" textAlign="center">
          flexível e atrativo de gerenciar seus projetos em uma única plataforma
        </Text>
      </Flex>
    </Flex>
  );
};
