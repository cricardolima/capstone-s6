import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
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
          <Flex
            width="100%"
            maxWidth="930px"
            justifyContent={["center", "center", "center", "flex-start"]}
            gridGap="10px"
            flexWrap="wrap"
            margin="0 auto"
          >
            {userOrders.map((item, index) => (
              <OrderCard item={item as any} key={index} />
            ))}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
