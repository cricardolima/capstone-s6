import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
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
          <Flex
            width="100%"
            maxWidth="930px"
            justifyContent={["center", "center", "center", "flex-start"]}
            gridGap="10px"
            flexWrap="wrap"
            margin="0 auto"
          >
            {companyOrders.map((item, index) => (
              <OrderCardCompany item={item as any} key={index} />
            ))}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex
            width="100%"
            maxWidth="930px"
            justifyContent={["center", "center", "center", "flex-start"]}
            gridGap="10px"
            flexWrap="wrap"
            margin="0 auto"
          >
            {unpickedOrders.map((item, index) => (
              <OrderCardUnpicked item={item as any} key={index} />
            ))}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
