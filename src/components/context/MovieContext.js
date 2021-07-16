import {useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movieData, setMovieData] = useState([]);

  return (
    <MovieContext.Provider value={[movieData, setMovieData]}>
      {props.children}
    </MovieContext.Provider>
  );
};
