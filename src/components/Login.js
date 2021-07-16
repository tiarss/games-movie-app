import React, { useContext, useEffect, useState } from "react";
import {
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";
import { useToast } from "@chakra-ui/react";

function Login() {
  let history = useHistory();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const [nemail, setEmail] = useState("");
  const [npass, setPass] = useState("");
  const [loginData, setLoginData] = useContext(LoginContext);

  const handleClick = () => setShow(!show);

  const Login = () => {
    axios
      .post("https://backendexample.sanbersy.com/api/user-login", {
        email: nemail,
        password: npass,
      })
      .then((res) => {
        setLoginData({
          token: res.data.token,
          username: res.data.user.name,
          login: true,
        });
        history.push("/");
        toast({
          title: "Anda Berhasil Login",
          status: "success",
          isClosable: true,
          position: "top"
        });
      }).catch((err)=>{
        console.log(err)
        toast({
          title: "Anda Gagal Login",
          status: "error",
          isClosable: true,
          position: "top"
        });
      });
    //console.log(loginData);
    setEmail("");
    setPass("");
  };

  const handleChangeEmail = (event) => {
    let inputValue = event.target.value;
    setEmail(inputValue);
  };

  const handleChangePass = (event) => {
    let inputValue = event.target.value;
    setPass(inputValue);
  };

  return (
    <Box>
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        direction="column"
      >
        <Heading mb="20px">Login</Heading>
        <Stack
          spacing={3}
          p="30px"
          w="450px"
          border="1px solid #dadce0"
          borderRadius="10px"
        >
          <Input
            value={nemail}
            variant="filled"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={npass}
              onChange={handleChangePass}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="green" onClick={Login}>
            Login
          </Button>
          <Text
            mt="20px"
            alignSelf="flex-start"
            cursor="pointer"
            onClick={function () {
               history.push("/signup");
            }}
          >
            Buat Akun Saja
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
