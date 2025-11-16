import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import Pokemons from "./Pages/Pokemons";
import PokemonDetails from "./Pages/PokemonDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:id" element={<PokemonDetails />} />
        
      </Routes>
    </div>
  );
}

export default App;
