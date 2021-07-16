import {
  Box,
  Text,
  Input,
  Stack,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { LoginContext } from "../context/LoginContext";
import useLocalStorage from '../storage/LocalStorage'
import { useToast } from "@chakra-ui/react";

function CreateM() {
  const { id } = useParams();
  let history = useHistory();
  const toast = useToast();
  const [gameData, setGameData] = useContext(GameContext);
  const [loginData, setLoginData] = useContext(LoginContext)

  const [newName, setNewName] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newSingle, setNewSingle] = useState(0);
  const [newMulti, setNewMulti] = useState(0);
  //set single === 0
  console.log(id)
  //set multi === 0
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await axios.get(
          `https://backendexample.sanbersy.com/api/data-game/${id}`
        );
        //console.log(result.data);
        setNewName(result.data.name);
        setNewImg(result.data.image_url);
        setNewYear(result.data.release);
        setNewGenre(result.data.genre);
        setNewPlatform(result.data.platform);
        setNewSingle(result.data.singlePlayer);
        setNewMulti(result.data.multiplayer);
        //console.log("useeffect");
      };
      fetchData();
    }
  }, []);

  const handleSubmit = () => {
    if (id == undefined) {
      axios
        .post(
          "https://backendexample.sanbersy.com/api/data-game",
          {
            name: newName,
            genre: newGenre,
            singlePlayer: newSingle,
            multiplayer: newMulti,
            platform: newPlatform,
            release: newYear,
            image_url: newImg,
          },
          {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          }
        )
        .then((res) => {
          let data = res.data;
          setGameData([
            ...gameData,
            {
              id: data.id,
              title: data.name,
              genre: data.genre,
              platform: data.platform,
              year: data.release,
              image_url: data.image_url,
              mode: {
                single: data.singlePlayer,
                multi: data.multiplayer,
              },
            },
          ]);
        });
    } else {
      console.log("tiar")
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-game/${id}`,
          {
            name: newName,
            genre: newGenre,
            singlePlayer: newSingle,
            multiplayer: newMulti,
            platform: newPlatform,
            release: newYear,
            image_url: newImg,
          },
          {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          }
        )
        .then(() => {
          let singleData = gameData.find((el) => el.id == id);
          console.log(singleData)
          singleData.title = newName;
          singleData.genre = newGenre;
          singleData.mode.single = newSingle;
          singleData.img = newImg;
          singleData.mode.multi = newMulti;
          singleData.year = newYear;
          singleData.platform = newPlatform;
          setGameData([...gameData]);
          toast({
            title: "Data telah di Edit",
            status: "success",
            isClosable: true,
            position: "top"
          });
        });
    }
    history.push("/games-list");
  };
  const checkedSingle = (single) => {
    if (single == undefined) {
      return false;
    } else if (single == 0) {
      return false;
    } else {
      return true;
    }
  };
  const checkedMulti = (multi) => {
    if (multi == undefined) {
      return false;
    } else if (multi == 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleChangeSingle = (event) => {
    let check = event.target.checked;
    if (check) {
      setNewSingle(1);
    } else {
      setNewSingle(0);
    }
  };
  const handleChangeMulti = (event) => {
    let check = event.target.checked;
    if (check) {
      setNewMulti(1);
    } else {
      setNewMulti(0);
    }
  };
  const handleChangeName = (event) => {
    let inputValue = event.target.value;
    setNewName(inputValue);
  };
  const handleChangeImg = (event) => {
    let inputValue = event.target.value;
    setNewImg(inputValue);
  };
  const handleChangePlatform = (event) => {
    let inputValue = event.target.value;
    setNewPlatform(inputValue);
  };
  const handleChangeYear = (event) => {
    let inputValue = event.target.value;
    setNewYear(inputValue);
  };
  const handleChangeGenre = (event) => {
    let inputValue = event.target.value;
    setNewGenre(inputValue);
  };

  return (
    <Box>
      <Heading mt="95px" p="0 50px">
        Add Game Info
      </Heading>
      <Flex w="100%" p="0 25px">
        <Box w="50%">
          <Stack spacing="15px" p="25px">
            <Text>Image Url :</Text>
            <Input
              value={newImg}
              onChange={handleChangeImg}
              placeholder="Type Image Url"
            />
            <Text>Name :</Text>
            <Input
              value={newName}
              onChange={handleChangeName}
              placeholder="Type the Name"
            />
            <Text>Mode :</Text>
            <Stack spacing={10} direction="row">
              <Checkbox
                isChecked={checkedSingle(newSingle)}
                value={newSingle}
                onChange={handleChangeSingle}
              >
                Single Player
              </Checkbox>
              <Checkbox
                isChecked={checkedMulti(newMulti)}
                value={newMulti}
                onChange={handleChangeMulti}
              >
                Multiplayer
              </Checkbox>
            </Stack>
            <Text>Genre :</Text>
            <Input
              value={newGenre}
              onChange={handleChangeGenre}
              placeholder="Type the Genre"
            />
          </Stack>
        </Box>
        <Box w="50%">
          <Stack spacing="15px" p="25px">
            <Text>Platform :</Text>
            <Input
              value={newPlatform}
              onChange={handleChangePlatform}
              placeholder="Type the Platform"
            />
            <Text>Release Year :</Text>
            <Input
              value={newYear}
              onChange={handleChangeYear}
              type="number"
              placeholder="Type the Release Date"
            />
            <Button onClick={handleSubmit} colorScheme="green">
            {id==undefined ? "Submit" : "Edit"}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default CreateM;
