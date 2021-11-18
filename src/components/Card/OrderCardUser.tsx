import {
  VStack,
  Text,
  HStack,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IOrderBody } from "../../providers/Order";
import { AiFillStar, AiOutlineCheck } from "react-icons/ai";
import ModalEvaluationScreen from "../Modal/ModalEvaluationScreen";

interface ItemProps {
  item: IOrderBody;
}

type inputVariationOptions = {
  [key: string]: string;
};
const inputVariation: inputVariationOptions = {
  pending: "placeholder",
  default: "text",
  concluded: "secondary",
  in_progress: "primary",
};

export const OrderCard = ({ item }: ItemProps) => {
  const {
    id,
    title,
    description,
    status,
    address,
    vehicle: { model },
    rating,
  } = item;
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const [variation, setVariation] = useState("default");

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
      return "Enviado para reboque";
    }
  };

  useEffect(() => {
    if (status === "pending") {
      return setVariation("pending");
    }
    if (status === "in_progress") {
      return setVariation("in_progress");
    }
    if (status === "concluded") {
      return setVariation("concluded");
    } else {
      return setVariation("default");
    }
  }, [status]);

  return (
    <VStack
      h={["220px"]}
      w={"100%"}
      maxWidth="300px"
      alignItems="flex-start"
      justifyContent="space-around"
      p="10px"
      border="2px solid"
      borderRadius="5px"
      color={inputVariation[variation]}
      borderColor={inputVariation[variation]}
    >
      <Text as="h1" fontSize={["md", "2xl"]} color="text" fontWeight="bold">
        {title}
      </Text>
      <Text as="h6" color="text">
        {description}
      </Text>
      <Text color="text">{address}</Text>
      <Text as="h6" color="text">
        {model}
      </Text>
      <HStack
        h="60px"
        w="100%"
        paddingBottom="8px"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text fontSize="sm">{updateProgress()}</Text>
        {!rating ? (
          (status === "concluded" || status === "sent_to_rescue") && (
            <Button
              w="65px"
              h="30px"
              color={inputVariation[variation]}
              bgColor="baseDefault"
              borderColor={inputVariation[variation]}
              border="1px solid"
              _hover={{ bgColor: "primary" }}
              type="submit"
              onClick={onToggle}
            >
              {/* <Icon as={AiOutlineCheck} /> */}
              Avaliar
            </Button>
          )
        ) : (
          <HStack>
            <Text>{rating.rate}</Text>
            <Icon as={AiFillStar} />
          </HStack>
        )}
      </HStack>
      <ModalEvaluationScreen
        id={id as any}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </VStack>
  );
};
