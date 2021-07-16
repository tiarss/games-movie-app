import React, {useState,useEffect} from 'react'
import axios from "axios";
import Movie from './Movie'
import { Heading,Grid} from "@chakra-ui/react";
function Movies() {

    const [moviethumb, setMoviehumb] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            "https://backendexample.sanbersy.com/api/data-movie"
          );
          setMoviehumb(
            result.data.map((el) => {
              return {
                id: el.id,
                title: el.title,
                duration: el.duration,
                rating: el.rating,
                img: el.image_url,
              }})
          );
        };
        fetchData();
      }, []);
    return (
        <div>
            <Heading fontSize="4xl" p="0px 50px" mb="20px" mt="100px">Movie</Heading>
            <Grid
                templateColumns="repeat(auto-fit,minmax(200px, 1fr))"
                gap={6}
                p="0px 50px"
                m="50px 0"
            >
                {moviethumb.map((data, index) => (
                <Movie
                    key={index}
                    img={data.img}
                    title={data.title}
                    rating={data.rating}
                    duration={data.duration}
                />
                ))}
            </Grid>
        </div>
    )
}

export default Movies
