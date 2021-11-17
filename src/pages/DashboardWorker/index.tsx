import {
  HStack,
  VStack,
  Image,
  Box,
  Text,
  Button,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import logo from "../../assets/logo.svg";
import { RiGridFill } from "react-icons/ri";
import { TabsWorker } from "../../components/Tabs/TabsWorker";
import { ModalCheckoutOrder } from "../../components/Modal/ModalCheckoutOrder";
import { useUserAuth } from "../../providers/UserAuth";

export const DashboardWorker = () => {
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
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
            <MenuItem>
              <Text>Perfil</Text>
            </MenuItem>
            <MenuItem>
              <Link onClick={() => logout()}>
                <Text>Sair</Text>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Button onClick={onToggle}>Toogle Modal</Button>
      <ModalCheckoutOrder isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Box mt="3rem">
        <TabsWorker />
      </Box>
    </>
  );
};
