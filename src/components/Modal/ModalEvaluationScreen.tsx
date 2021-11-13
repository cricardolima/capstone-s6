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
  Text
} from "@chakra-ui/react";
import {Input} from "../../components/Input"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useUserAuth } from "../../providers/UserAuth";

interface IOrderData {
  description: string;
}

const orderSchema = yup.object().shape({
  description: yup.string().required("Campo obrigatório"),
});

const defaultValues:IOrderData  = {
  description: "",
}

interface DisclosureData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

console.log(orderSchema)

const ModalEvaluationScreen = ({ isOpen, onClose, onOpen }: DisclosureData) => {
//  const {user, accessToken} = useUserAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState,
  } = useForm<IOrderData>({ resolver: yupResolver(orderSchema), defaultValues: defaultValues  } );

  const { errors, isSubmitSuccessful  } = formState;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset]);

  const handleEvaluation = (data: IOrderData) => {
   // onClose();
   console.log(data)
  }
  return (
    <> 
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleEvaluation)}>
          <ModalHeader color="title" textAlign="center" fontSize="2xl"> Avaliação de Serviço</ModalHeader>
          <ModalCloseButton  bg="error" color="white" _hover={{bg: "placeholder"}} />
          <ModalBody>
          <FormLabel fontSize="14px"> Descrição :</FormLabel>
          <Textarea
              borderColor="text"
              _hover={{ borderColor: "#000000" }}
              _focus={{ borderColor: "secondary" }}
              _placeholder={{ color: "placeholder" }}
              placeholder="Adicione algum comentário aqui..."
              height="120"
              {...register("description")}
            />
             {errors.description?.message && (
              <Text color="error">{errors.description?.message}</Text>
            )}
          </ModalBody>
          <ModalFooter justifyContent="center">
          <Button
            w="238px"
            h="50px"
            color="baseDefault"
            bgColor="secondary"
            _hover={{ bgColor: "primary" }}
            type="submit"
          > Concluir
          </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEvaluationScreen;
