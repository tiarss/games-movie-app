import { Flex, Spacer, Text } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Heading, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./context/LoginContext.js";
// import { useEffect, useState } from "react";
// import Login from "./Login.js";

const Navbar = () => {
  
  const [loginData, setLoginData] = useContext(LoginContext)

  return (
    <Flex
      p="4"
      boxShadow="md"
      rounded="md"
      bg="white"
      pos="fixed"
      w="100%"
      top="0"
      zIndex="5"
    >
      <Box p="2">
        <Heading size="md" ml="5">
          Download Free Game anda Movie
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Flex align="center">
          <Link to="/">
            <Text mr="4" fontSize="l" cursor="pointer">
              Home
            </Text>
          </Link>
          <Link to="/movies">
            <Text mr="4" fontSize="l" cursor="pointer">
              Movies
            </Text>
          </Link>
          <Link to="/games">
            <Text mr="4" fontSize="l" cursor="pointer">
              Games
            </Text>
          </Link>
          {loginData.login ? LoginMenu({ loginData, setLoginData }) : UnloginMenu()}
        </Flex>
      </Box>
    </Flex>
  );
};

function UnloginMenu() {
  let history = useHistory();
  const login = () => {
    history.push("/login");
  };

  return (
    <div>
      <Button onClick={login} colorScheme="teal" mr="5" lineHeight="0">
        Log in
      </Button>
    </div>
  );
}

function LoginMenu({ loginData, setLoginData }) {
  let history = useHistory();

  const click = () => {
    history.push("/movies-list");
  };

  const clicks = () => {
    history.push("/games-list");
  };

  const logout = () => {
    history.push("/");
    setLoginData({
      token:"",
      username:"",
      login:false
    });
    //setUserName("")
  };

  return (
    <div>
      <Menu>
        <>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            lineHeight="0"
          >
            {loginData.username}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={click}>Edit Movies List</MenuItem>
            <MenuItem onClick={clicks}>Edit Games List</MenuItem>
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </MenuList>
        </>
      </Menu>
    </div>
  );
}

export default Navbar;
