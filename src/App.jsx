import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import Pokemons from "./Pages/Pokemons";
import PokemonDetails from "./Pages/PokemonDetails";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<StartPage />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:id" element={<PokemonDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
