import { Link } from "react-router-dom";
import bg from "../assets/bg.gif";
import PokemonFloating from "../components/MovedPokemon";

const StartPage = () => {
  return (
    <>
      <div className="StartPage">
        <h1>Pokemon Explorer</h1>
        <p>
          Welcome to the amazing world of Pokemon! Explore hundreds of Pokemon
          species, discover their unique abilities, and build your dream team.
        </p>
        <Link to="/pokemons">
          <button>Get Started</button>
        </Link>
      </div>
      <img className="bg" src={bg} alt="" />
      <PokemonFloating />
    </>
  );
};

export default StartPage;
