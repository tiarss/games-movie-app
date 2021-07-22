import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function ViewMovie() {
  let { id } = useParams();
  const [dataById, setDataById] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/data-movie/${id}`
      );
      let data = result.data;
      //console.log(data)
      setDataById({
        id: data.id,
        desc: data.description,
        dur: data.duration,
        genre: data.genre,
        img: data.image_url,
        rating: data.rating,
        review: data.review,
        title: data.title,
        year: data.year,
      });
      //console.log(result.data)
    };
    fetchData();
  });

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
            <Image src={dataById.img} alt="movie" w="250px"/>
            <Flex direction="column" p="0 20px">
              <Text>Genre : {dataById.genre}</Text>
              <Text>Rating : {dataById.rating}/10</Text>
              <Text>Release Year : {dataById.year}</Text>
              <Text>Duration : {dataById.dur}</Text>
              <Text>Description : {dataById.desc}</Text>
              <Text>Review : {dataById.review}</Text>
            </Flex>
          </Flex>
      </Flex>
    </div>
  );
}

export default ViewMovie;
