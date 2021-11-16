import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Textarea,
  Flex,
  Text,
  Slider,
  Img,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import check from "../../assets/ok.svg";
import { useOrder } from "../../providers/Order";

interface IOrderData {
  commentary: string;
}

const orderSchema = yup.object().shape({
  commentary: yup.string().required("Campo obrigatório"),
});

const defaultValues: IOrderData = {
  commentary: "",
};

interface DisclosureData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

console.log(orderSchema);

const ModalEvaluationScreen = ({ isOpen, onClose, onOpen }: DisclosureData) => {
  const { rateOrder } = useOrder();
  const [rate, setRate] = useState(3);
  const { register, handleSubmit, reset, formState } = useForm<IOrderData>({
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

  const handleEvaluation = (data: IOrderData) => {
    onClose();
    const newData = {
      ...data,
      rate: rate,
    };
    //OBS
    // O id da ordem esta fixo porem vai ser pego quando houver o card do serviço.
    rateOrder(4, newData);
  };
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
          <ModalHeader
            mt="30px"
            color="title"
            textAlign="center"
            fontSize="2xl"
          >
            <Flex
              color="text"
              fontWeight="bold"
              justifyContent="center"
              alignItems="center"
            >
              Avaliação de Serviço
              <Img src={check} alt="ok svg" />
            </Flex>
            <Text color="text" fontWeight="100" fontSize="lg">
              Avalie de 1 a 5
            </Text>
          </ModalHeader>

          <ModalCloseButton
            bg="error"
            color="white"
            _hover={{ bg: "placeholder" }}
          />
          <ModalBody>
            <Slider
              onChangeEnd={(value) => setRate(value)}
              className="resposta"
              defaultValue={50}
              min={0}
              max={100}
              step={25}
            >
              <Flex
                justifyContent="space-between"
                transform={"translateY(-30px)"}
              >
                <Text>1</Text>
                <Text>2</Text>
                <Text>3</Text>
                <Text>4</Text>
                <Text>5</Text>
              </Flex>
              <SliderTrack bg="#e0e0e0">
                <Box position="relative" right={10} bgColor="yellow.300" />
                <SliderFilledTrack bg="secondary" />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color="secondary" as={CheckCircleIcon} />
              </SliderThumb>
            </Slider>
            <FormLabel color="text" fontSize="14px">
              {" "}
              Descrição :
            </FormLabel>
            <Textarea
              borderColor="text"
              _hover={{ borderColor: "#000000" }}
              _focus={{ borderColor: "secondary" }}
              _placeholder={{ color: "placeholder" }}
              placeholder="Adicione algum comentário aqui..."
              height="120"
              {...register("commentary")}
            />
            {errors.commentary?.message && (
              <Text color="error">{errors.commentary?.message}</Text>
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
            >
              {" "}
              Concluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEvaluationScreen;
