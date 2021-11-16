import { Tabs, TabList, Tab, TabPanels, TabPanel,Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ModalEvaluationScreen from "../../components/Modal/ModalEvaluationScreen";



export const TabsUser = () => {
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Teste!</p>
          <Button
            w="238px"
            h="50px"
            color="baseDefault"
            bgColor="secondary"
            _hover={{ bgColor: "primary" }}
            type="submit"
            onClick={onToggle}
          >Chamar avaliação
          </Button>
        </TabPanel>
      </TabPanels>
      <ModalEvaluationScreen isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Tabs>
  );
};
