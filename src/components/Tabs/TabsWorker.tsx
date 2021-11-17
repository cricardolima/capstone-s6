import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ModalInstruction from "../../components/Modal/ModalInstruction";
export const TabsWorker = () => {
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
        <Tab>Serviços Disponíveis</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Teste!</p>
          <Link
            href="https://www.google.com/maps/place/Av.+Lineu+Machado,+145+-+J%C3%B3quei+Clube,+Fortaleza+-+CE,"
            isExternal
          >
            <Button> Ir para o Maps </Button>
          </Link>
          <Button onClick={onToggle}>Tutorial de Navegação</Button>
          <ModalInstruction isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </TabPanel>
        <TabPanel>
          <p>Teste!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
