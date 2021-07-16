import React, { useContext, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GameContext } from "./context/GameContext";
import { LoginContext } from "./context/LoginContext";
import { useToast } from "@chakra-ui/react";

function GameList() {
  let history = useHistory();
  const [gameData, setGameData] = useContext(GameContext);
  const [loginData, setLoginData] = useContext(LoginContext)
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://backendexample.sanbersy.com/api/data-game"
      );
      setGameData(
        result.data.map((el) => {
          return {
            id: el.id,
            title: el.name,
            img: el.image_url,
            year: el.release,
            genre: el.genre,
            platform: el.platform,
            mode: {
              single: el.singlePlayer,
              multi: el.multiplayer,
            },
          };
        })
      );
    };
    fetchData();
  }, []);

  const handleDelete = (event) => {
    let idGame = parseInt(event.target.value);
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      })
      .then(() => {
        let deleteData = gameData.filter((el) => {
          return el.id !== idGame;
        });
        setGameData(deleteData)
        toast({
          title: "Data telah di hapus",
          status: "success",
          isClosable: true,
          position: "top"
        });
      });  
  };

  const Mode = (single, multi) => {
    if (single === 1 && multi === 1) {
      return "Single Player & Multiplayer";
    } else if (single === 1) {
      return "Single Player";
    } else if (multi === 1) {
      return "Multiplayer";
    } else {
      return "-";
    }
  };
  return (
    <Box p="50px" mt="50px">
      <Heading mb="20px">Tabel Game List</Heading>
      <Button
        colorScheme="green"
        onClick={function () {
          history.push("/games-list/create");
        }}
      >
        Add +
      </Button>
      <Table variant="striped" colorScheme="teal" size="sm" mt="20px">
        <TableCaption>Tabel Game Movie</TableCaption>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Genre</Th>
            <Th>Platform</Th>
            <Th>Release</Th>
            <Th>Mode</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {gameData.map((el, index) => (
            <Tr key={el.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Image src={el.img} boxSize="40px"></Image>
              </Td>
              <Td>{el.title}</Td>
              <Td>{el.genre}</Td>
              <Td>{el.platform}</Td>
              <Td>{el.year}</Td>
              <Td>{Mode(el.mode.single, el.mode.multi)}</Td>
              <Td>
                <Button
                  value={el.id}
                  onClick={function () {
                    history.push(`/games-list/edit/${el.id}`);
                  }}
                  leftIcon={<EditIcon />}
                  colorScheme="yellow"
                  size="xs"
                >
                  Edit
                </Button>
                <Button
                  value={el.id}
                  onClick={handleDelete}
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  size="xs"
                  mt="10px"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default GameList;
