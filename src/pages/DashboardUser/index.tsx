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
import ModalOrderRegister from "../../components/Modal/ModalOrder";
import { RiGridFill } from "react-icons/ri";
import { TabsUser } from "../../components/Tabs/TabsUser";

export const DashboardUser = () => {
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();

  const logout = (path: any) => {
    console.log(path);
  };

  return (
    <>
      <HStack ml="2%" mt="2%" spacing={[2, 5, 10]}>
        <Box>
          <Image src={logo} alt="Logo" h="140px" w="120px" />
        </Box>
        <VStack alignItems="flex-start" w={["50%", "65%", "75%"]}>
          <Text as="h3" color="text" fontWeight="bold">
            Dashboard Usuário
          </Text>
          <Button
            w={["170px", "200px"]}
            h="50px"
            color="baseDefault"
            bgColor="secondary"
            _hover={{ bgColor: "primary" }}
            type="submit"
            onClick={onToggle}
          >
            Cadastrar Chamado
          </Button>
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
              <Link onClick={() => logout("saiu")}>
                <Text>Sair</Text>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <ModalOrderRegister isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Box mt="3rem">
        <TabsUser />
      </Box>
    </>
  );
};
