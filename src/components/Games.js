import React, {useState,useEffect} from 'react'
import axios from "axios";
import { Heading, Grid } from "@chakra-ui/react";
import Game from './Game'
function Games() {

    const [gamethumb, setGamethumb] = useState([]);

    useEffect(() => {
    const fetchData1 = async()=>{
        const result = await axios.get('https://backendexample.sanbersy.com/api/data-game')
        //console.log(result.data)
        setGamethumb(result.data.map((el)=>{return{
            id:el.id,
            title:el.name,
            genre:el.genre,
            img:el.image_url
        }}))
    }
    fetchData1();
    },[])
    return (
        <div>
            <Heading fontSize="4xl" p="0px 50px" mb="20px" mt="100px">Games</Heading>
            <Grid
                templateColumns="repeat(auto-fit,minmax(200px, 1fr))"
                gap={6}
                p="0px 50px"
                m="50px 0"
            >
                {gamethumb.map((data, index) => (
                <Game
                    key={index}
                    id={data.id}
                    img={data.img}
                    title={data.title}
                    genre={data.genre}
                />
                ))}
            </Grid>
        </div>
    )
}

export default Games
