import React from "react";
import {
  Flex,
  Text,
  Img,
  Textarea,
  FormLabel,
  FormControl,
  Stack,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import checkSvg from "../../assets/ok.svg";

//import * as yup from "yup";
//import { yupResolver } from "@hookform/resolvers/yup";

//import { useForm } from "react-hook-form";

interface CheckoutProps {
  callback: () => void | null;
}

export const CheckOut = ({ callback }: CheckoutProps) => {
  const handleCheckout = () => {};
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
        width="95%"
        maxWidth="500px"
        height="400px"
        boxSizing="border-box"
        padding="15px"
        borderRadius="5px"
        backgroundColor="baseDefault"
      >
        <Flex width="100%" justifyContent="flex-end">
          <Button
            margin="0px"
            padding="0px"
            borderRadius="5px"
            backgroundColor="error"
            color="baseDefault"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            X
          </Button>
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
          <Button
            width="120px"
            bgColor="secondary"
            color="White"
            _hover={{ bgColor: "secondaryTwo" }}
          >
            Resolvido
          </Button>
          <Button width="120px" border="1px solid #000000">
            Reboque
          </Button>

          {/*<RadioGroup>
            <Stack direction="row">
              <Radio value="1">Resolvido</Radio>
              <Radio value="2">Reboque</Radio>
            </Stack>
          </RadioGroup>*/}
        </Flex>
        <Flex width="100%" gridGap="10px" justifyContent="Center">
          <FormControl>
            <FormLabel color="text">Descrição : </FormLabel>
            <Textarea
              required
              borderColor="text"
              _hover={{ borderColor: "#000000" }}
              _focus={{ borderColor: "secondary" }}
              _placeholder={{ color: "placeholder" }}
              placeholder="Ex : A válvula de ignição precisou ser trocada."
              height="120"
            />
          </FormControl>
        </Flex>
        <Flex width="100%" gridGap="10px" justifyContent="Center">
          <Button
            onClick={() => callback()}
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
