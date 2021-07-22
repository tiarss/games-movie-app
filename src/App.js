import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Games from "./components/Games";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { MovieProvider } from "./components/context/MovieContext";
import { GameProvider } from "./components/context/GameContext";
import { LoginProvider } from "./components/context/LoginContext";
import MoviesList from "./components/gabung/MoviesList";
import GamesList from "./components/gabung/GamesList";
import CreateGame from "./components/gabung/CreateGame";
import CreateMovie from "./components/gabung/CreateMovie";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ViewGame from "./components/ViewGame";
import ViewMovie from "./components/ViewMovie";

function App() {
  return (
    <Router>
      <div className="App">
        <ChakraProvider>
          <LoginProvider>
            <MovieProvider>
              <GameProvider>
                <Switch>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/signup">
                    <Signup />
                  </Route>
                  <Route exact path="/">
                    <Navbar />
                    <Home />
                  </Route>
                  <Route exact path="/movies">
                    <Navbar />
                    <Movies />
                  </Route>
                  <Route exact path="/games">
                    <Navbar />
                    <Games />
                  </Route>
                  <Route exact path="/games/:id">
                    <ViewGame />
                  </Route>
                  <Route exact path="/movies/:id">
                    <ViewMovie />
                  </Route>
                  <ProtectedRoute exact path="/movies-list" component={MoviesList}/>
                  <ProtectedRoute exact path="/games-list" component={GamesList}/>
                  <ProtectedRoute exact path="/movies-list/create" component={CreateMovie}/>
                  <ProtectedRoute exact path="/movies-list/edit/:id" component={CreateMovie}/>
                  <ProtectedRoute exact path="/games-list/create" component={CreateGame}/>
                  <ProtectedRoute exact path="/games-list/edit/:id" component={CreateGame}/>
                </Switch>
              </GameProvider>
            </MovieProvider>
          </LoginProvider>
        </ChakraProvider>
      </div>
    </Router>
  );
}

export default App;
