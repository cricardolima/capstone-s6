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
  Flex,
  Text,
  Img,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import tutorial1 from "../../assets/tutorial1.svg";
import selectMaps from "../../assets/selectMaps.jpg";

interface DisclosureData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ModalEvaluationScreen = ({ isOpen, onClose, onOpen }: DisclosureData) => {
  const [page, SetPage] = useState(0);
  const handleEvaluation = () => {
    onClose();
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
        <ModalContent>
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
              Tutorial para Navegação
            </Flex>
            <Text color="text" fontWeight="100" fontSize="lg">
              Instruções para navegar até o cliente.
            </Text>
          </ModalHeader>

          <ModalCloseButton
            bg="error"
            color="white"
            _hover={{ bg: "placeholder" }}
          />

          {page === 0 && (
            <>
              <ModalBody
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Img src={tutorial1} alt="insctuction 1" />
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Button
                  w="238px"
                  h="50px"
                  color="baseDefault"
                  bgColor="secondary"
                  _hover={{ bgColor: "primary" }}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => SetPage(1)}
                >
                  Próximo
                </Button>
              </ModalFooter>
            </>
          )}

          {page === 1 && (
            <>
              <ModalBody
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Img
                  src={selectMaps}
                  alt="insctuction 1"
                  border="4px solid"
                  borderColor="secondary"
                  borderRadius="2px"
                />
              </ModalBody>

              <ModalFooter justifyContent="center">
                <Button
                  w="238px"
                  h="50px"
                  color="baseDefault"
                  bgColor="secondary"
                  _hover={{ bgColor: "primary" }}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => SetPage(0)}
                >
                  Próximo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEvaluationScreen;
