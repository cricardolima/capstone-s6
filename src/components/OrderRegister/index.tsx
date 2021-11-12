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
  Text
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useUserAuth } from "../../providers/UserAuth";

interface IOrderData {
  model: string;
  year: number;
  issue: string;
  description: string;
  address: string;
}

const orderSchema = yup.object().shape({
  model: yup.string().required("Campo obrigatório"),
  year: yup.number().required("Campo obrigatório"),
  issue: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  address: yup.string().required("Campo obrigatório"),
});

const OrderRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {user, accessToken} = useUserAuth();

  const commonStyle = {
    _placeholder: { color: "placeholder" },
    borderColor: "borderInput",
    borderRadius: "8px",
    borderWidth: "1px",
    color: "text",
    bg: "bgInput",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderData>({ resolver: yupResolver(orderSchema) });

  const handleRegister = (data: IOrderData) => {
    const {issue, description, address, model, year } = data;

    const body = {
      title: issue,
      description,
      address,
      rating: {},
      status: "pending",
      vehicle: {model, year},
      userId: user?.id,
    }
    api.post("/orders", body,{ headers:{ Authorization: `Bearer ${accessToken}` }})
    .then(() => console.log("Deu Show"))
    .catch(()=> console.log("Deu Ruim"))
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
          <ModalHeader color="title" textAlign="center" fontSize="2xl"> Novo Chamado </ModalHeader>
          <ModalCloseButton  bg="error" color="white" _hover={{bg: "placeholder"}} />
          <ModalBody>
            <Stack
              as="form"
              id="orderRegister"
              onSubmit={handleSubmit(handleRegister)}
              direction="column"
              spacing={3}
            >
                <Text textAlign="center" fontSize="xl" children="Veículo" />
              <Stack 
              spacing={2} direction="row" >
                <FormControl isInvalid={!!errors.model} id="model">
                  <FormLabel fontSize="14px"> Modelo </FormLabel>
                  <Input
                    placeholder="Honda Civic"
                    type="text"
                    {...register("model")}
                    {...commonStyle}
                  />
                <FormErrorMessage> {errors.model?.message} </FormErrorMessage>
              </FormControl>
              
                <FormControl w="unset"  isInvalid={!!errors.year} id="year">
                  <FormLabel fontSize="14px" > Ano </FormLabel>
                  <Input
                  w="80px"
                    textAlign="center"
                    placeholder="2017"
                    type="number"
                    {...register("year")}
                    {...commonStyle}
                  />
                <FormErrorMessage> {errors.year?.message} </FormErrorMessage>
              </FormControl>
              </Stack>

              <FormControl id="issue" isInvalid={!!errors.issue}>
                <FormLabel fontSize="14px"> Problema </FormLabel>
                <Select
                  cursor="pointer"
                  defaultValue=""
                  placeholder="Selecione o problema"
                  icon={<TiArrowSortedDown />}
                  {...register("issue")}
                  {...commonStyle}
                >
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
              colorScheme="buttonSchema"
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
