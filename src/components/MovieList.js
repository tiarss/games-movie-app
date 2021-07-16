import React, { useContext, useEffect, useState } from "react";
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
import { MovieContext } from "./context/MovieContext";
import { LoginContext } from "./context/LoginContext";
import { useToast } from "@chakra-ui/react";

function MovieList() {
  let history = useHistory();
  const toast = useToast();
  const [movieData, setMovieData] = useContext(MovieContext);
  const [loginData, setLoginData] = useContext(LoginContext)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://backendexample.sanbersy.com/api/data-movie"
      );
      setMovieData(
        result.data.map((el) => {
          return {
            id: el.id,
            title: el.title,
            duration: el.duration,
            rating: el.rating,
            img: el.image_url,
            year: el.year,
            genre: el.genre,
            review: el.review,
            desc: el.description,
          };
        })
      );
    };
    fetchData();
  }, []);

  const handleDelete = (event) => {
    let idMovie = parseInt(event.target.value);
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      })
      .then(() => {
        let deleteData = movieData.filter((el) => {
          return el.id !== idMovie;
        });
        setMovieData(deleteData);
        toast({
          title: "Data telah di hapus",
          status: "success",
          isClosable: true,
          position: "top"
        });
      });
  };
  return (
    <Box p="50px" mt="50px">
      <Heading mb="20px">Tabel Movie List</Heading>
      <Button
        colorScheme="green"
        onClick={function () {
          history.push("/movies-list/create");
        }}
      >
        Add +
      </Button>
      <Table variant="striped" colorScheme="teal" size="sm" mt="20px">
        <TableCaption>Tabel List Movie</TableCaption>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Image</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Year</Th>
            <Th>Duration</Th>
            <Th>Genre</Th>
            <Th>Rating</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movieData.map((el, index) => (
            <Tr key={el.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Image src={el.img} boxSize="40px"></Image>
              </Td>
              <Td>{el.title}</Td>
              <Td>{el.desc}</Td>
              <Td>{el.year}</Td>
              <Td>{el.duration}</Td>
              <Td>{el.genre}</Td>
              <Td>{el.rating}</Td>
              <Td>
                <Button
                  value={el.id}
                  onClick={function () {
                    history.push(`/movies-list/edit/${el.id}`);
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

export default MovieList;
