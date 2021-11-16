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
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { orderIssueOptions } from "../../utils/orderIssueOptions";
import { useOrder, IOrderData } from "./../../providers/Order";

interface IOrderFormData {
  model: string;
  year: string;
  issue: string;
  description: string;
  address: string;
}

const orderSchema = yup.object().shape({
  model: yup.string().required("Campo obrigatório"),
  year: yup.string().required("Campo obrigatório"),
  issue: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  address: yup.string().required("Campo obrigatório"),
});

const defaultValues: IOrderFormData = {
  model: "",
  year: "",
  issue: "",
  description: "",
  address: "",
};

interface DisclosureData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ModalOrderRegister = ({ isOpen, onClose, onOpen }: DisclosureData) => {
  const { newOrder } = useOrder();

  const commonStyle = {
    _placeholder: { color: "placeholder" },
    borderColor: "borderInput",
    borderRadius: "8px",
    borderWidth: "1px",
    color: "text",
    bg: "bgInput",
  };

  const { register, handleSubmit, reset, formState } = useForm<IOrderFormData>({
    resolver: yupResolver(orderSchema),
    defaultValues: defaultValues,
  });

  const { errors, isSubmitSuccessful } = formState;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset]);

  const handleRegister = (data: IOrderFormData) => {
    onClose();
    const { issue, description, address, model, year } = data;

    const body: IOrderData = {
      title: issue,
      description,
      address,
      vehicle: { model, year: Number(year) },
    };

    newOrder(body);
  };

  const handleCloseModal = () => {
    onClose();
    reset(defaultValues);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="sm"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="title" textAlign="center" fontSize="2xl">
            Novo Chamado
          </ModalHeader>
          <ModalCloseButton
            bg="error"
            color="white"
            _hover={{ bg: "placeholder" }}
          />
          <ModalBody>
            <Stack
              as="form"
              id="orderRegister"
              onSubmit={handleSubmit(handleRegister)}
              direction="column"
              spacing={3}
            >
              <Text textAlign="center" fontSize="xl" children="Veículo" />
              <Stack spacing={2} direction="row">
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

                <FormControl w="unset" isInvalid={!!errors.year} id="year">
                  <FormLabel fontSize="14px"> Ano </FormLabel>
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
                  {orderIssueOptions.map((issue, index) => (
                    <option key={index} value={issue} children={issue} />
                  ))}
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
                  {errors.description?.message}
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

export default ModalOrderRegister;
