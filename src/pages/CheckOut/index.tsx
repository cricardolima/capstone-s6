import React from "react";
import {
  Flex,
  Text,
  Img,
  Textarea,
  FormLabel,
  FormControl,
  Stack,
  Box,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import checkSvg from "../../assets/ok.svg";
import closeSvg from "../../assets/close.svg";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

interface CheckoutProps {
  callback: () => void | null;
}

const checkOutSchema = yup.object().shape({
  description: yup.string().required("Campo obrigatório"),
  action: yup.string().nullable().required("Selecione um dos campos."),
});

export const CheckOut = ({ callback }: CheckoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkOutSchema) });

  const handleCheckout = (data: object) => {
    console.log(data);
  };
  return (
    <Flex
      width="100%"
      minHeight="100vh"
      backgroundColor="rgba(0,0,0,0.33) "
      position="fixed"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        as="form"
        onSubmit={handleSubmit(handleCheckout)}
        width="95%"
        maxWidth="500px"
        height="400px"
        boxSizing="border-box"
        padding="15px"
        borderRadius="5px"
        backgroundColor="baseDefault"
      >
        <Flex width="100%" justifyContent="flex-end">
          <Box
            width="25px"
            height="25px"
            borderRadius="5px"
            backgroundColor="error"
            color="baseDefault"
            display="flex"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            onClick={() => callback()}
          >
            <Img src={closeSvg} alt="button close conserta meu carro!" />
          </Box>
        </Flex>
        <Flex width="95%" justifyContent="Center">
          <Text
            display="flex"
            alignItems="center"
            gridGap="5px"
            fontSize="2xl"
            fontWeight="bold"
            color="text"
          >
            Checkout da Ordem
            <Img width="40px" src={checkSvg} alt="checkout order" />
          </Text>
        </Flex>
        <Flex width="100%" gridGap="10px" justifyContent="Center">
          <RadioGroup>
            <Stack direction="row">
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
        </Flex>
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
        <Flex width="100%" gridGap="10px" justifyContent="Center">
          <Button
            type="submit"
            width="200px"
            bgColor="secondary"
            color="White"
            _hover={{ bgColor: "secondaryTwo" }}
          >
            Conluir
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};
