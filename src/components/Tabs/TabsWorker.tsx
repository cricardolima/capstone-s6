import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

export const TabsWorker = () => {
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
        <Tab>Serviços Disponíveis</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Teste!</p>
        </TabPanel>
        <TabPanel>
          <p>Teste!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};