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
import maps from "../../assets/maps.jpg";
import mapsFinal from "../../assets/mapsFinal.jpg";

interface DisclosureData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ModalEvaluationScreen = ({ isOpen, onClose, onOpen }: DisclosureData) => {
  const [page, setPage] = useState(0);
  const handleInstruction = () => {
    onClose();
    setPage(0);
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
            onClick={() => setPage(0)}
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
              <ModalFooter
                display="display"
                flexDirection="column"
                textAlign="center"
              >
                <Text padding="5px" color="text">
                  Primeiro : Na ordem de serviço clique no botão maps.
                </Text>
                <Button
                  w="238px"
                  h="50px"
                  color="baseDefault"
                  bgColor="secondary"
                  _hover={{ bgColor: "primary" }}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => setPage(1)}
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

              <ModalFooter
                display="display"
                flexDirection="column"
                textAlign="center"
              >
                <Text padding="5px" color="text">
                  Segundo : Selecione a opção de abrir com o google Maps.
                </Text>
                <Button
                  w="238px"
                  h="50px"
                  color="baseDefault"
                  bgColor="secondary"
                  _hover={{ bgColor: "primary" }}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => setPage(3)}
                >
                  Próximo
                </Button>
              </ModalFooter>
            </>
          )}
          {page === 3 && (
            <>
              <ModalBody
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Img
                  src={maps}
                  alt="insctuction 1"
                  border="4px solid"
                  borderColor="secondary"
                  borderRadius="2px"
                />
              </ModalBody>

              <ModalFooter
                display="display"
                flexDirection="column"
                textAlign="center"
              >
                <Text padding="5px" color="text">
                  Terceiro : Clique no Rotas para calcular a rota da empresa até
                  o usuário.
                </Text>
                <Button
                  w="238px"
                  h="50px"
                  color="baseDefault"
                  bgColor="secondary"
                  _hover={{ bgColor: "primary" }}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => setPage(4)}
                >
                  Próximo
                </Button>
              </ModalFooter>
            </>
          )}
          {page === 4 && (
            <>
              <ModalBody
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Img
                  src={mapsFinal}
                  alt="insctuction 1"
                  border="4px solid"
                  borderColor="secondary"
                  borderRadius="2px"
                />
              </ModalBody>

              <ModalFooter
                display="display"
                flexDirection="column"
                textAlign="center"
              >
                <Text padding="5px" color="text">
                  Quarto : Clique no botão de iniciar para navegar até o
                  cliente.
                </Text>
                <Button
                  w="238px"
                  h="50px"
                  color="baseDefault"
                  bgColor="secondary"
                  _hover={{ bgColor: "primary" }}
                  onClick={() => handleInstruction()}
                >
                  Fechar
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
