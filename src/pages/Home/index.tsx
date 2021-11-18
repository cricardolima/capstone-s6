import React from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Stack,
  Image,
  Text,
  Icon,
  Grid,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import checkSVG from "../../assets/ok.svg";
import Partners from "../../assets/Company-cuate.svg";
import Users from "../../assets/Hotel Booking-cuate.svg";
import { useHistory } from "react-router";
import { AiOutlineArrowDown } from "react-icons/ai";
import { Footer } from "../../components/Footer";

export const Home = () => {
  const history = useHistory();

  const goTo = (path: string) => {
    return history.push(path);
  };

  return (
    <>
      <Box h="960px" w="100vw" backgroundColor="secondary">
        <HStack flexDirection="row-reverse">
          <Button
            w="174px"
            h="62px"
            borderRadius="0px"
            backgroundColor="primary"
            color="baseDefault"
            onClick={() => goTo("/registerUser")}
            _hover={{ backgroundColor: "secondary" }}
          >
            Registre-se
          </Button>
          <Button
            h="62px"
            borderRadius="0px"
            backgroundColor="inherit"
            color="baseDefault"
            onClick={() => goTo("/login")}
            _hover={{ backgroundColor: "primary" }}
          >
            Login
          </Button>
        </HStack>
        <VStack>
          <Image src={logo} h="240px" />
          <Text
            color="baseDefault"
            as="h1"
            fontSize="9xl"
            fontWeight="800"
            textShadow="2px 2px 3px #111111"
          >
            Conserta meu carro!
          </Text>
          <Text
            color="baseDefault"
            fontSize="2xl"
            textShadow="2px 2px 3px #111111"
          >
            Seu mecânico na mão em qualquer lugar!
          </Text>
        </VStack>
        <VStack mt="11%">
          <Text color="primary" fontWeight="bold">
            Sobre nós
          </Text>
          <Icon as={AiOutlineArrowDown} color="primary" h="18px" />
        </VStack>
      </Box>
      <Box w="100%" backgroundColor="primary" h="960px">
        <Grid templateColumns="repeat(2, 1fr)" alignItems="center" h="100%">
          <VStack>
            <Image src={checkSVG} h="240px" />
            <Text
              as="h2"
              fontSize="5xl"
              color="baseDefault"
              textShadow="2px 2px 3px #111111"
            >
              Conserta meu carro!
            </Text>
          </VStack>
          <Text
            as="h3"
            fontSize="3xl"
            textAlign="justify"
            w="80%"
            color="baseDefault"
            textShadow="2px 2px 3px #111111"
          >
            Seu carro deu problema na estrada e você precisa de socorro o mais
            rápido possível? O Conserta Meu Carro! promete tornar mais eficiente
            o processo de busca de ajuda para resolver esse inconveniente!
          </Text>
        </Grid>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" alignItems="center" h="815px">
        <VStack spacing={12}>
          <Text as="h2" fontSize="4xl" fontWeight="bold">
            Empresas Parceiras
          </Text>
          <Image src={Partners} h="500px" />
        </VStack>
        <Stack
          backgroundColor="secondary"
          h="100%"
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box h="500px" w="500px" backgroundColor="baseDefault"></Box>
        </Stack>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" alignItems="center" h="815px">
        <Stack
          backgroundColor="primary"
          h="100%"
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box h="500px" w="500px" backgroundColor="baseDefault"></Box>
        </Stack>
        <VStack spacing={12}>
          <Text as="h2" fontSize="4xl" fontWeight="bold">
            Usuário do APP
          </Text>
          <Image src={Users} h="500px" />
        </VStack>
      </Grid>
      <Footer />
    </>
  );
};
