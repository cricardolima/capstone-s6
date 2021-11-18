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
  Flex,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import checkSVG from "../../assets/ok.svg";
import Partners from "../../assets/Company-cuate.svg";
import Users from "../../assets/Hotel Booking-cuate.svg";
import enforcer from "../../assets/enforcer-mechs.jpg";
import garage from "../../assets/garage.svg";
import macedo from "../../assets/macedo.svg";
import skull from "../../assets/skull.svg";
import { useHistory } from "react-router";
import { AiOutlineArrowDown } from "react-icons/ai";
import { IoIosHelpBuoy } from "react-icons/io";
import { Footer } from "../../components/Footer";

export const Home = () => {
  const history = useHistory();

  const goTo = (path: string) => {
    return history.push(path);
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        h={["650px", "960px", "960px", "960px"]}
        w="100%"
        backgroundColor="secondary"
      >
        <HStack flexDirection="row-reverse">
          <Button
            w="174px"
            h="62px"
            borderRadius="0px"
            backgroundColor="blue.600"
            color="baseDefault"
            onClick={() => goTo("/registerUser")}
            _hover={{ backgroundColor: "primary" }}
          >
            Registre-se
          </Button>
          <Button
            h="62px"
            borderRadius="0px"
            backgroundColor="inherit"
            color="baseDefault"
            onClick={() => goTo("/login")}
            _hover={{ backgroundColor: "blue.600" }}
          >
            Login
          </Button>
        </HStack>
        <VStack>
          <Image mt="20px" src={logo} h="240px" />
          <Text
            color="baseDefault"
            as="h1"
            fontSize={["3xl", "5xl", "7xl", "8xl"]}
            fontWeight="800"
            textShadow="2px 2px 3px #111111"
            textAlign="center"
          >
            Conserta meu carro!
          </Text>
          <Text
            color="baseDefault"
            fontSize={["lg", "xl", "lx", "2lx"]}
            textShadow="2px 2px 3px #111111"
            textAlign="center"
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
      </Flex>
      <Flex
        flexDirection={["column", "row", "row", "row"]}
        justifyContent="center"
        alignItems="center"
        w="100%"
        backgroundColor="primary"
        h="960px"
      >
        <VStack flex={1} justifyContent="center">
          <Image src={checkSVG} h="240px" />
          <Text
            as="h2"
            fontSize="5xl"
            color="baseDefault"
            textShadow="2px 2px 3px #111111"
            textAlign="center"
          >
            Conserta meu carro!
          </Text>
        </VStack>
        <HStack flex={2} color="baseDefault" justifyContent="center">
          <Text
            as="h3"
            maxW="80%"
            fontSize="3xl"
            textShadow="2px 2px 3px #111111"
            textAlign="center"
          >
            Seu carro deu problema na estrada e você precisa de socorro o mais
            rápido possível? O Conserta Meu Carro! promete tornar mais eficiente
            o processo de busca de ajuda para resolver esse inconveniente!
          </Text>
        </HStack>
      </Flex>
      <Flex flexDirection={["column", "row", "row", "row"]} width="100%">
        <Flex flexDirection="column" width="100%" margin="0 auto">
          <VStack spacing={12}>
            <Text as="h2" fontSize="4xl" fontWeight="bold" textAlign="center">
              Empresas Parceiras
            </Text>
            <Image src={Partners} />
          </VStack>
        </Flex>
        <Stack
          backgroundColor="secondary"
          w="100%"
          alignItems="center"
          justifyContent="center"
          padding="20px 0px"
        >
          <Flex
            h="300px"
            w="90%"
            maxWidth="500px"
            backgroundColor="baseDefault"
            flexWrap="wrap"
            gridGap="10px"
            alignContent="center"
            justifyContent="space-evenly"
            p="10px"
          >
            <Image h="90px" src={enforcer} />
            <Image h="90px" src={garage} />
            <Image h="90px" src={macedo} />
            <Image h="90px" src={skull} />
          </Flex>
        </Stack>
      </Flex>

      <Flex flexDirection={["column", "row", "row", "row"]} width="100%">
        <Stack
          backgroundColor="primary"
          w="100%"
          alignItems="center"
          justifyContent="center"
          padding="20px 0px"
        >
          <VStack
            h="500px"
            width="90%"
            maxWidth="500px"
            backgroundColor="baseDefault"
            justifyContent="center"
            spacing={12}
          >
            <Icon boxSize="80px" color="blue.600" as={IoIosHelpBuoy} />
            <Text
              maxW="80%"
              as="h2"
              textAlign="center"
              fontSize="2xl"
              fontWeight="bold"
            >
              No Conserta Meu Carro!, encontrar alguém para resolver seu
              problema é mais fácil!
            </Text>
            <Button
              w="174px"
              h="62px"
              borderRadius="10px"
              backgroundColor="blue.600"
              color="baseDefault"
              onClick={() => goTo("/registerUser")}
              _hover={{ backgroundColor: "primary" }}
            >
              Registre-se
            </Button>
          </VStack>
        </Stack>
        <Flex flexDirection="column" width="100%" margin="0 auto">
          <VStack spacing={12}>
            <Text as="h2" fontSize="4xl" fontWeight="bold" textAlign="center">
              Usuário do APP
            </Text>
            <Image src={Users} />
          </VStack>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};
