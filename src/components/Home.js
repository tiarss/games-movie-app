import { Text, Flex, Heading, Button, Box } from "@chakra-ui/react";
import Movies from "./Movies";
import Games from "./Games";
import { useHistory } from "react-router-dom";


function Home() {
  let history = useHistory()
  return (
    <Box m="60px 0">
      <Flex>
        <Flex
          w="50%"
          justify="center"
          align="center"
          direction="column"
          h="90vh"
          p="0px 50px"
        >
          <Heading mt="5">Aplikasi Download Game dan Film Free</Heading>
        </Flex>
        <Flex
          w="50%"
          justify="center"
          align="flex-end"
          direction="column"
          h="90vh"
          p="0px 50px"
        >
          <Text fontSize="xl" textAlign="right">
            Ini merupakan Aplikasi Download Game dan Film
          </Text>
          <Text fontSize="4xl" textAlign="right">
            Free
          </Text>
          <Button mt="20px" colorScheme="teal" onClick={function(){history.push('/signup')}}>
            Daftar Disini
          </Button>
        </Flex>
      </Flex>
      <Movies />
      <Games />
    </Box>
  );
}

export default Home;
