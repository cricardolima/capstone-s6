import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IOrderData {
  vehicle: string;
  issue: string;
  description: string;
  address: string;
}

const orderSchema = yup.object().shape({
  vehicle: yup.string().required("Campo obrigatório"),
  issue: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  address: yup.string().required("Campo obrigatório"),
});

const OrderRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commonStyle = {
    borderWidth: "1px",
    borderColor: "gray.400",
    bg: "gray.300",
    color: "orange",
    borderRadius: "8px",
    _placeholder: { color: "orange" },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderData>({ resolver: yupResolver(orderSchema) });

  const handleRegister = (data: IOrderData) => {
    console.log(data);
  };

  return (
    <>
      <Button mt={3} onClick={onOpen}>
        Trigger modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center"> Novo Chamado </ModalHeader>
          <ModalCloseButton bg="error" color="white" />
          <ModalBody>
            <Stack
              as="form"
              id="orderRegister"
              onSubmit={handleSubmit(handleRegister)}
              direction="column"
              spacing={3}
            >
              <FormControl isInvalid={!!errors.vehicle} id="vehicle">
                <FormLabel fontSize="14px"> Veículo </FormLabel>
                <Input
                  placeholder="Ex. Honda Civic, 2017"
                  type="text"
                  {...register("vehicle")}
                  {...commonStyle}
                />
                <FormErrorMessage> {errors.vehicle?.message} </FormErrorMessage>
              </FormControl>

              <FormControl id="issue" isInvalid={!!errors.issue}>
                <FormLabel fontSize="14px"> Problema </FormLabel>
                <Select
                  cursor="pointer"
                  icon={<TiArrowSortedDown />}
                  {...register("issue")}
                  {...commonStyle}
                >
                  <option disabled selected value="">
                    Selecione o problema
                  </option>
                  <option value="Motor de arranque"> Motor de arranque </option>
                  <option value="Não liga mais"> Não liga mais </option>
                  <option value="Pneu furado"> Pneu furado </option>
                </Select>
                <FormErrorMessage> {errors.issue?.message} </FormErrorMessage>
              </FormControl>

              <FormControl id="description" isInvalid={!!errors.description}>
                <FormLabel fontSize="14px"> Descrição </FormLabel>
                <Textarea
                  placeholder="Descreva aqui o que está acontecendo"
                  size="sm"
                  {...register("description")}
                  {...commonStyle}
                />
                <FormErrorMessage>
                  {" "}
                  {errors.description?.message}{" "}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="address" isInvalid={!!errors.address}>
                <FormLabel fontSize="14px"> Endereço </FormLabel>
                <Input
                  placeholder="Av. dos Bandeirantes, próximo ao viaduto"
                  type="text"
                  {...register("address")}
                  {...commonStyle}
                />
                <FormErrorMessage> {errors.address?.message} </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              form="orderRegister"
            >
              Cadastrar Chamado
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderRegister;
