import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

export const TabsUser = () => {
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Teste!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
