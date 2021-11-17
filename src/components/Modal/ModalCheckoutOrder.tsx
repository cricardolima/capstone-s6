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
  Textarea,
} from "@chakra-ui/react";
import checkSvg from "../../assets/ok.svg";
import closeSvg from "../../assets/close.svg";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { ICheckoutData, IOrderBody, useOrder } from "../../providers/Order";

interface DisclosureData {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const checkOutSchema = yup.object().shape({
  diagnostic: yup.string().required("Campo obrigatório"),
  status: yup.string().nullable().required("Selecione um dos campos."),
});

export const ModalCheckoutOrder = ({
  orderId,
  isOpen,
  onClose,
  onOpen,
}: DisclosureData) => {
  const { checkoutOrder } = useOrder();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckoutData>({ resolver: yupResolver(checkOutSchema) });

  const handleCheckout = (data: ICheckoutData) => {
    console.log(data);
    checkoutOrder(orderId, data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(handleCheckout)}>
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
                {...register("status")}
                colorScheme="green"
                value="concluded"
              >
                Resolvido
              </Radio>
              <Radio
                {...register("status")}
                colorScheme="yellow"
                value="sent_to_rescue"
              >
                Reboque
              </Radio>
            </Stack>
            {errors.status?.message && (
              <Text color="error">{errors.status?.message}</Text>
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
                {...register("diagnostic")}
              />
              {errors.diagnostic?.message && (
                <Text color="error">{errors.diagnostic?.message}</Text>
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
