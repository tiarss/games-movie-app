import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [gameData, setGameData] = useState([]);
  return (
    <GameContext.Provider value={[gameData, setGameData]}>
      {props.children}
    </GameContext.Provider>
  );
};
