import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { OrderCard } from "../Card/OrderCardUser";
import { useOrder } from "../../providers/Order";

export const TabsUser = () => {
  const { userOrders } = useOrder();

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid columns={[1, 2, 3, 5]} spacing="20px">
            {userOrders.map((item, index) => (
              <OrderCard item={item as any} key={index} />
            ))}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
