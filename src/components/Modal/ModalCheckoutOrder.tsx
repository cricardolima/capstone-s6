import React from "react";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Text,
  RadioGroup,
  Stack,
  Button,
  Radio,
  Flex,
  FormControl,
  FormLabel,
  Textarea
} from "@chakra-ui/react";
import checkSvg from "../../assets/ok.svg";
import closeSvg from "../../assets/close.svg";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

interface DisclosureData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const checkOutSchema = yup.object().shape({
  description: yup.string().required("Campo obrigatório"),
  action: yup.string().nullable().required("Selecione um dos campos."),
});

export const ModalCheckoutOrder = ({
  isOpen,
  onClose,
  onOpen,
}: DisclosureData) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkOutSchema) });

  const handleCheckout = (data: object) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton>
            <Image src={closeSvg} alt="button close conserta meu carro!" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text
            display="flex"
            justifyContent="center"
            alignItems="center"
            gridGap="5px"
            fontSize="2xl"
            fontWeight="bold"
            color="text"
          >
            Checkout da Ordem
            <Image width="40px" src={checkSvg} alt="checkout order" />
          </Text>
          <RadioGroup>
            <Stack direction="row" justifyContent="center">
              <Radio
                {...register("action")}
                colorScheme="green"
                value="Resolvido no local."
              >
                Resolvido
              </Radio>
              <Radio
                {...register("action")}
                colorScheme="yellow"
                value="Reboque acionado."
              >
                Reboque
              </Radio>
            </Stack>
            {errors.action?.message && (
              <Text color="error">{errors.action?.message}</Text>
            )}
          </RadioGroup>
          <Flex width="100%" gridGap="10px" justifyContent="Center">
            <FormControl>
              <FormLabel color="text">Descrição : </FormLabel>
              <Textarea
                borderColor="text"
                _hover={{ borderColor: "#000000" }}
                _focus={{ borderColor: "secondary" }}
                _placeholder={{ color: "placeholder" }}
                placeholder="Ex : A válvula de ignição precisou ser trocada."
                height="120"
                {...register("description")}
              />
              {errors.description?.message && (
                <Text color="error">{errors.description?.message}</Text>
              )}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" gridGap="10px" justifyContent="Center">
            <Button
              type="submit"
              width="200px"
              bgColor="secondary"
              color="White"
              _hover={{ bgColor: "secondaryTwo" }}
            >
              Concluir
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
