import { VStack, HStack, Text, Icon, Avatar, Link } from "@chakra-ui/react";
import etnan from "../../assets/etnan.jpeg";
import { FaLinkedinIn } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

export const Footer = () => {
  return (
    <VStack w="100%" backgroundColor="secondary" spacing={10}>
      <Text
        as="h2"
        fontSize="4xl"
        fontWeight="bold"
        color="baseDefault"
        pt="30px"
      >
        Time
      </Text>
      <Text
        as="h4"
        fontSize="xl"
        color="baseDefault"
        textAlign="justify"
        fontWeight="800"
        w="60%"
      >
        Nosso time de desenvolvedores está constantemente implementando novas
        funcionalidades para o crescimento da plataforma!
      </Text>
      <HStack spacing={10} pb="20px">
        <VStack>
          <Avatar
            h="200px"
            w="200px"
            name="Etnan Nascimento Sousa"
            src={etnan}
            border="2px solid"
          />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Etnan Sousa
          </Text>
          <HStack spacing={5}>
            <Link href="https://www.linkedin.com/in/etnan/">
              <Icon as={FaLinkedinIn} height="40px" width="40px" />
            </Link>
            <Link href="https://github.com/Poketnans">
              <Icon as={BsGithub} height="40px" width="40px" />
            </Link>
          </HStack>
        </VStack>
        <VStack>
          <Avatar h="200px" w="200px" border="2px solid" />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Luiz Assunção
          </Text>
          <HStack spacing={5}>
            <Icon as={FaLinkedinIn} height="40px" width="40px" />
            <Icon as={BsGithub} height="40px" width="40px" />
          </HStack>
        </VStack>
        <VStack>
          <Avatar h="200px" w="200px" border="2px solid" />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Bruno Ferreira
          </Text>
          <HStack spacing={5}>
            <Icon as={FaLinkedinIn} height="40px" width="40px" />
            <Icon as={BsGithub} height="40px" width="40px" />
          </HStack>
        </VStack>
        <VStack>
          <Avatar h="200px" w="200px" border="2px solid" />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Ricardo Lima
          </Text>
          <HStack spacing={5}>
            <Icon as={FaLinkedinIn} height="40px" width="40px" />
            <Icon as={BsGithub} height="40px" width="40px" />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
