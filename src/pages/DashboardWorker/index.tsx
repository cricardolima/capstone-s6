import {
  HStack,
  VStack,
  Image,
  Box,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { RiGridFill } from "react-icons/ri";
import { TabsWorker } from "../../components/Tabs/TabsWorker";
import { useUserAuth } from "../../providers/UserAuth";

export const DashboardWorker = () => {
  const { logout } = useUserAuth();

  return (
    <>
      <HStack ml="2%" mt="2%" spacing={[2, 5, 10]}>
        <Box>
          <Image src={logo} alt="Logo" h="140px" w="120px" />
        </Box>
        <VStack alignItems="flex-start" w={["50%", "60%", "70%", "80%"]}>
          <Text as="h3" color="text" fontWeight="bold">
            Dashboard Empresa
          </Text>
        </VStack>
        <Menu>
          <MenuButton>
            <Icon as={RiGridFill} h="29px" w="29px" />
          </MenuButton>
          <MenuList>
            <MenuItem></MenuItem>
            <MenuItem isDisabled>
              <Text>Perfil (Em Breve)</Text>
            </MenuItem>
            <MenuItem onClick={() => logout()}>
              <Text>Sair</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Box mt="3rem">
        <TabsWorker />
      </Box>
    </>
  );
};
