import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";

const OrderRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button mt={3} onClick={onOpen}>
        Trigger modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Chamado</ModalHeader>
          <ModalCloseButton bg="error" color="white" />
          <ModalBody>Formulário</ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cadastrar Chamado
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderRegister;
