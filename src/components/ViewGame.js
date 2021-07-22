import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
function ViewGame() {
  let { id } = useParams();
  const [dataById, setDataById] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/data-game/${id}`
      );
      let data = result.data;
      //console.log(data)
      setDataById({
        id: data.id,
        title: data.name,
        img: data.image_url,
        year: data.release,
        genre: data.genre,
        platform: data.platform,
        single: data.singlePlayer,
        multi: data.multiplayer,
      });
      //console.log(result.data)
    };
    fetchData();
  });

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
    <div>
      <Navbar />
      <Flex mt="50px" p="50px" direction="column">
        <Box>
          <Heading size="lg" mb="20px">
            {dataById.title}
          </Heading>
        </Box>
        <Flex>
          <Image src={dataById.img} alt="movie" w="250px" />
          <Flex direction="column" p="0 20px">
            <Text>Genre : {dataById.genre}</Text>
            <Text>Platform : {dataById.platform}</Text>
            <Text>Release Year : {dataById.year}</Text>
            <Text>Mode : {Mode(dataById.single,dataById.multi)}</Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default ViewGame;
