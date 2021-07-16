import {
  Box,
  Text,
  Input,
  Textarea,
  Stack,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";
import { MovieContext } from "../context/MovieContext";
import { useHistory, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Create() {
  const { id } = useParams();
  let history = useHistory();
  const toast = useToast();
  
  const [movieData, setMovieData] = useContext(MovieContext);
  const [loginData, setLoginData] = useContext(LoginContext)

  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState();
  const [newRating, setNewRating] = useState();
  const [newImg, setNewImg] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newYear, setNewYear] = useState();
  const [newGenre, setNewGenre] = useState("");
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await axios.get(
          `https://backendexample.sanbersy.com/api/data-movie/${id}`
        );
        setNewTitle(result.data.title);
        setNewDuration(result.data.duration);
        setNewRating(result.data.rating);
        setNewImg(result.data.image_url);
        setNewDesc(result.data.description);
        setNewYear(result.data.year);
        setNewGenre(result.data.genre);
        setNewReview(result.data.review);
      };
      fetchData();
    }
  }, []);

  const handleSubmit = () => {
    if (id == undefined) {
      axios
        .post(
          "https://backendexample.sanbersy.com/api/data-movie",
          {
            title: newTitle,
            duration: newDuration,
            rating: newRating,
            image_url: newImg,
            description: newDesc,
            year: newYear,
            genre: newGenre,
            review: newReview,
          },
          {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          }
        )
        .then((res) => {
          let data = res.data;
          setMovieData([
            ...movieData,
            {
              id: data.id,
              title: data.title,
              duration: data.duration,
              rating: data.rating,
              img: data.image_url,
              desc: data.description,
              year: data.year,
              genre: data.genre,
            },
          ]);
        }).catch((err)=>{
          console.log(err)
        });
    } else {
      //console.log("halo")
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-movie/${id}`,
          {
            title: newTitle,
            duration: newDuration,
            rating: newRating,
            image_url: newImg,
            description: newDesc,
            year: newYear,
            genre: newGenre,
            review: newReview,
          },
          {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          }
        )
        .then(() => {
          let singleData = movieData.find((el) => el.id == id);
          //console.log(singleData)
          singleData.title = newTitle;
          singleData.duration = newDuration;
          singleData.rating = newRating;
          singleData.image_url = newImg;
          singleData.year = newYear;
          singleData.description = newDesc;
          singleData.genre = newGenre;
          singleData.review = newReview;
          setMovieData([...movieData]);
          toast({
            title: "Data telah di Edit",
            status: "success",
            isClosable: true,
            position: "top"
          });
        });
    }
    history.push("/movies-list");
  };

  const handleChangeTitle = (event) => {
    let inputValue = event.target.value;
    setNewTitle(inputValue);
  };
  const handleChangeDuration = (event) => {
    let inputValue = event.target.value;
    setNewDuration(inputValue);
  };
  const handleChangeRating = (event) => {
    let inputValue = event.target.value;
    setNewRating(inputValue);
  };
  const handleChangeImg = (event) => {
    let inputValue = event.target.value;
    setNewImg(inputValue);
  };
  const handleChangeDesc = (event) => {
    let inputValue = event.target.value;
    setNewDesc(inputValue);
  };
  const handleChangeYear = (event) => {
    let inputValue = event.target.value;
    setNewYear(inputValue);
  };
  const handleChangeGenre = (event) => {
    let inputValue = event.target.value;
    setNewGenre(inputValue);
  };
  const handleChangeReview = (event) => {
    let inputValue = event.target.value;
    setNewReview(inputValue);
  };

  return (
    <Box>
      <Heading mt="95px" p="0 50px">
        Add Movie Info
      </Heading>
      <Flex w="100%" p="0 25px">
        <Box w="50%">
          <Stack spacing="15px" p="25px">
            <Text>Image Url :</Text>
            <Input
              value={newImg}
              onChange={handleChangeImg}
              placeholder="Type Image Url"
              isRequired={true}
            />
            <Text>Title :</Text>
            <Input
              value={newTitle}
              onChange={handleChangeTitle}
              placeholder="Type the Title"
            />
            <Text>Release Year :</Text>
            <Input
              type="number"
              value={newYear}
              onChange={handleChangeYear}
              placeholder="Type the Release Year"
            />
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
            <Text>Duration :</Text>
            <Input
              type="number"
              value={newDuration}
              onChange={handleChangeDuration}
              placeholder="Type the Duration (minutes)"
            />
            <Text>Rating :</Text>
            <Input
              type="number"
              value={newRating}
              onChange={handleChangeRating}
              placeholder="Type the Rating 1-10"
            />
            <Text>Review :</Text>
            <Input
              value={newReview}
              onChange={handleChangeReview}
              placeholder="Type the Review"
            />
            <Text>Description :</Text>
            <Textarea
              value={newDesc}
              onChange={handleChangeDesc}
              placeholder="Write the Description of the Movie"
            />
            <Button colorScheme="green" onClick={handleSubmit}>
              {id==undefined ? "Submit" : "Edit"}
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Create;
