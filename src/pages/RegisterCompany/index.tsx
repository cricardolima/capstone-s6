import * as React from 'react'
import {
  Flex,
  Text,
  Box,
  Stack,
  Button,
  Img,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import consertaLogo from "../../assets/logo.svg";

import { Link } from "react-router-dom";
import {useUserAuth} from "../../providers/UserAuth"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

interface RegisterCompanyData {
  name: string | null;
  company_name: string;
  cnpj: string;
  address : string;
  email: string;
  password: string;
  passwordTwo: string;
  type: string;
  phone: string;
}
const registerCompanySchema = yup.object().shape({
  name: yup.string().required("Nome Obrigátorio"),
  cnpj: yup.string().required("CNPJ ou CPF obrigatório"),
  company_name: yup.string(),
  phone: yup.string().required("Telefone Obrigatório"),
  email: yup.string().required("Email Obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha Obrigatório")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
      "8 caracters:1 letra maiúscula,1 letra minúscula, 1 número e 1 caractere especial."
    ),
  passwordTwo: yup
    .string()
    .required("Confirmar Senha Obrigatório")
    .oneOf([yup.ref("password"), null], "As senhas não correspondem!"),
});

export const RegisterCompany = () => {
  const {registerCompany} = useUserAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerCompanySchema) });
  const handleRegisterCompany = (data: RegisterCompanyData) => {
    registerCompany({...data,type: "company"})
  };
  return (
    <Flex
      width="100%"
      padding="10px 0px"
      height={["180vh", "100vh", "100vh"]}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgColor="secondary"
    >
      <Flex
        as="form"
        onSubmit={handleSubmit(handleRegisterCompany)}
        flexDirection="column"
        alignItems="center"
        bgColor="baseDefault"
        width="90%"
        maxWidth="1200px"
        padding="20px"
        boxShadow="0px 4px 8px 4px rgba(0, 0, 0, 0.25);"
      >
        <Flex
          width="100%"
          flexDirection={["column", "column", "row"]}
          justifyContent="center"
          gridGap="10px"
        >
          <Stack flex="1" alignItems="center">
            <Flex
              width="100%"
              height="60px"
              margin="10px 0px"
              paddingRight="40px"
              justifyContent="space-between"
            >
              <Flex flex="1" justifyContent="flex-start" alignItems="center">
                <ButtonBack />
              </Flex>
              <Flex flex="1" justifyContent="flex-end" alignItems="center">
                <Img width="80px" src={consertaLogo} alt="Conserta Logo!" />
              </Flex>
            </Flex>
            <Box w="100%" maxWidth="400px" margin="0 auto">
              <Input
                placeholder="Razão Social"
                label={"Razão Social"}
                type="text"
                error={errors.company_name}
                {...register("company_name")}
              />
            </Box>
            <Box w="100%" maxWidth="400px" margin="0 auto">
              <Input
                placeholder="CNPJ"
                label={"CNPJ :"}
                type="text"
                error={errors.cnpj}
                {...register("cnpj")}
              />
            </Box>
            <Box w="100%" maxWidth="400px" margin="0 auto">
              <Input
                placeholder="Nome Fantasia"
                label={"Nome Fantasia :"}
                type="text"
                {...register("name")}
              />
            </Box>
            <Box w="100%" maxWidth="400px" margin="0 auto">
              <Input
                placeholder="(85) 9 1234-5678 "
                label={"Telefone:"}
                type="text"
                error={errors.phone}
                {...register("phone")}
              />
            </Box>
          </Stack>

          <Stack flex="1">
            <Flex
              width="100%"
              height="60px"
              margin="10px 0px"
              justifyContent="space-between"
            >
              <Flex flex="1" justifyContent="center" alignItems="center">
                <Text
                  fontSize={["lg", "2xl", "2xl"]}
                  fontWeight="bold"
                  color="text"
                  textAlign={["center", "start", "start"]}
                >
                  Cadastro de Empresa ou Empreendedor Individual
                </Text>
              </Flex>
            </Flex>
            <Box w="100%" maxWidth="400px" margin="0 auto">
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
            <Box w="100%" maxWidth="400px" margin="0 auto">
              <Input
                placeholder="Senha"
                label={"Senha :"}
                type="password"
                error={errors.password}
                {...register("password")}
              />
            </Box>
            <Box w="100%" maxWidth="400px" margin="0 auto">
              <Input
                placeholder="Confirmação de Senha"
                label={"Confirmação de Senha :"}
                type="password"
                error={errors.passwordTwo}
                {...register("passwordTwo")}
              />
            </Box>
          </Stack>
          <Flex></Flex>
        </Flex>
        <Button
          margin="30px 0px 0px 0px"
          width="100%"
          maxWidth="400px"
          padding="30px"
          color="baseDefault"
          bgColor="secondary"
          _hover={{ bgColor: "primary" }}
          type="submit"
        >
          Cadastrar
        </Button>
        <Text marginTop="10px" textAlign="center">
          É usuário?
          <ChakraLink as={Link} color="text" to="/registerUser">
            {" "}
            clique aqui
          </ChakraLink>{" "}
          para se cadastrar!
        </Text>
      </Flex>
    </Flex>
  );
};
