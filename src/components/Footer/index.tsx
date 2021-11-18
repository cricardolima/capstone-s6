import { VStack, HStack, Text, Icon, Avatar, Link } from "@chakra-ui/react";
import etnan from "../../assets/etnan.jpeg";
import luiz from "../../assets/luiz.png";
import bruno from "../../assets/bruno.jpg";
import ricardo from "../../assets/ricardo.jpg";
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
      <HStack
        flexDirection={["column", "row", "row", "row"]}
        flexWrap="wrap"
        spacing={[0, 10, 10, 10]}
        pb="20px"
        gridGap="20px"
      >
        <VStack>
          <Avatar
            color="baseDefault"
            h="200px"
            w="200px"
            name="Etnan Nascimento Sousa"
            src={etnan}
            border="2px solid"
          />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Etnan Sousa
          </Text>
          <HStack>
            <Link href="https://www.linkedin.com/in/etnan/" isExternal>
              <Icon as={FaLinkedinIn} height="40px" width="40px" />
            </Link>
            <Link href="https://github.com/Poketnans" isExternal>
              <Icon as={BsGithub} height="40px" width="40px" />
            </Link>
          </HStack>
        </VStack>
        <VStack>
          <Avatar
            color="baseDefault"
            h="200px"
            w="200px"
            border="2px solid"
            name="Luiz Victor Do Nascimento Assunção"
            src={luiz}
          />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Luiz Assunção
          </Text>
          <HStack>
            <Link
              href="https://www.linkedin.com/in/luiz-victor-do-nascimento-assun%C3%A7%C3%A3o-b98029214/"
              isExternal
            >
              <Icon as={FaLinkedinIn} height="40px" width="40px" />
            </Link>
            <Link href="https://github.com/BaiduAV" isExternal>
              <Icon as={BsGithub} height="40px" width="40px" />
            </Link>
          </HStack>
        </VStack>
        <VStack>
          <Avatar
            color="baseDefault"
            h="200px"
            w="200px"
            border="2px solid"
            src={bruno}
          />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Bruno Ferreira
          </Text>
          <HStack>
            <Link
              href="https://www.linkedin.com/in/brferreiraoliveira/"
              isExternal
            >
              <Icon as={FaLinkedinIn} height="40px" width="40px" />
            </Link>
            <Link href="https://github.com/Brunoro811" isExternal>
              <Icon as={BsGithub} height="40px" width="40px" />
            </Link>
          </HStack>
        </VStack>
        <VStack>
          <Avatar
            color="baseDefault"
            h="200px"
            w="200px"
            border="2px solid"
            src={ricardo}
          />
          <Text color="baseDefault" fontSize="2xl" fontWeight="bold">
            Ricardo Lima
          </Text>
          <HStack>
            <Link
              href="https://www.linkedin.com/in/ricardo-lima-70496a93/"
              isExternal
            >
              <Icon as={FaLinkedinIn} height="40px" width="40px" />
            </Link>
            <Link href="https://github.com/cricardolima" isExternal>
              <Icon as={BsGithub} height="40px" width="40px" />
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
