import { Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid } from "@chakra-ui/react";
import { useOrder } from "../../providers/Order";
import { OrderCardCompany } from "../Card/OrderCardCompany";
import { OrderCardUnpicked } from "../Card/OrderCardUnpicked";

export const TabsWorker = () => {
  const { companyOrders, unpickedOrders } = useOrder();

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
        <Tab>Serviços Disponíveis</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        <SimpleGrid columns={[1, 2, 3, 5]} spacing="20px">
            {companyOrders.map((item, index) => (
              <OrderCardCompany item={item as any} key={index} />
            ))}
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <SimpleGrid columns={[1, 2, 3, 5]} spacing="20px">
            {unpickedOrders.map((item, index) => (
              <OrderCardUnpicked item={item as any} key={index} />
            ))}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
