import {
  HStack,
  VStack,
  Image,
  Box,
  Text,
  Icon,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { RiGridFill } from "react-icons/ri";
import { TabsWorker } from "../../components/Tabs/TabsWorker";
import { useUserAuth } from "../../providers/UserAuth";
import { useDisclosure } from "@chakra-ui/hooks";
import ModalInstruction from "../../components/Modal/ModalInstruction";

export const DashboardWorker = () => {
  const { logout } = useUserAuth();
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();

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
          <ModalInstruction isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          <Flex padding="10px" flexWrap="wrap">
            <Button onClick={onToggle}>Tutorial do Maps</Button>
          </Flex>
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
