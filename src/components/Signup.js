import React, { useState } from "react";
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
import { useToast } from "@chakra-ui/react";

function Signup() {
  let history = useHistory();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const [nuser, setUser] = useState("");
  const [nemail, setEmail] = useState("");
  const [npass, setPass] = useState("");

  const handleClick = () => setShow(!show);

  const Create = () => {
    axios
      .post("https://backendexample.sanbersy.com/api/register", {
        name: nuser,
        email: nemail,
        password: npass,
      })
      .then(() => {
        history.push("/login");
        toast({
          title: "Akun Telah dibuat",
          status: "success",
          isClosable: true,
          position: "top"
        });
      })
      .catch((err) => {
        //console.log(JSON.stringify(error.response.data));
        let error = JSON.parse(err.response.data);
        for (const property in error) {
          toast({
            title: `${error[property]}`,
            status: "error",
            isClosable: true,
            position: "top"
          });
        }
      });
  };

  const handleChangeUser = (event) => {
    let inputValue = event.target.value;
    setUser(inputValue);
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
        <Heading mb="20px">Buat Akun</Heading>
        <Stack
          spacing={3}
          p="30px"
          w="450px"
          border="1px solid #dadce0"
          borderRadius="10px"
        >
          <Input
            value={nuser}
            variant="filled"
            placeholder="Username"
            onChange={handleChangeUser}
          />
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
          <Button colorScheme="green" onClick={Create}>
            Sign Up
          </Button>
          <Text
            mt="20px"
            alignSelf="flex-start"
            cursor="pointer"
            onClick={function () {
              history.push("/login");
            }}
          >
            Login Saja
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Signup;
