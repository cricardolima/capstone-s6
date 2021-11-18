import {
  VStack,
  Text,
  HStack,
  Button,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { IOrderBody } from "../../providers/Order";
import { ModalCheckoutOrder } from "../Modal/ModalCheckoutOrder";

interface ItemProps {
  item: IOrderBody;
}

export const OrderCardCompany = ({ item }: ItemProps) => {
  const { title, description, status, address, vehicle } = item;
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();

  const updateProgress = () => {
    if (status === "pending") {
      return "Pendente";
    }
    if (status === "in_progress") {
      return "Em andamento";
    }
    if (status === "concluded") {
      return "Concluído";
    } else {
      return "A caminho";
    }
  };

  return (
    <VStack
      h={["220px"]}
      w={"100%"}
      maxWidth="300px"
      //w={["200px", "250px", "270px", "300px"]}
      alignItems="flex-start"
      p="20px 0px 0px 20px"
      border="2px solid"
      borderRadius="5px"
      color="text"
      borderColor="text"
    >
      <Text as="h1" fontSize={["md", "2xl"]} color="text" fontWeight="bold">
        {title}
      </Text>
      <Text as="h6" color="text" fontSize="xs">
        {description}
      </Text>
      <Text fontSize="xs">{address}</Text>
      <Text fontSize="xs">
        {vehicle?.model} - {vehicle?.year}
      </Text>
      <HStack
        h="45px"
        w="90%"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text fontSize="sm">{updateProgress()}</Text>
        <Link
          href={`https://www.google.com/maps/place/${item.address}`}
          isExternal
        >
          <Button
            w="60px"
            h="30px"
            color="text"
            bgColor="baseDefault"
            borderColor="text"
            border="1px solid"
            _hover={{ bgColor: "primary" }}
            type="submit"
          >
            Maps
          </Button>
        </Link>

        <Button
          w="90px"
          h="30px"
          color="text"
          bgColor="baseDefault"
          borderColor="text"
          border="1px solid"
          _hover={{ bgColor: "primary" }}
          type="submit"
          onClick={onToggle}
        >
          Atualizar
        </Button>
      </HStack>
      <ModalCheckoutOrder isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </VStack>
  );
};
