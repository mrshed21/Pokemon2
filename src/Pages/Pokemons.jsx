import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(false)
  const fetchAllPokemons = async () => {
    setLoading(true);
    setError(false)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pokemons.length}&limit=5`);
     
      const data = await res.json();
      console.log(data)

      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          const detail = await res.json();
          return {
            id: detail.id,
            name: detail.name,
            sprite:
              detail.sprites.versions["generation-v"]["black-white"].animated
                .front_default,
            types: detail.types.map((t) => t.type.name),
          };
        })
      );

      setPokemons([...pokemons , ...detailed]);
      
    } catch (err) {
       console.error(err);
      setError(true)

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <div className="Pokemons">
      <h2>Pokemons Page</h2>
      {error && <p> an error has occord </p>}
      <div className="PokemonList">
        {pokemons.map((pokemon, index) => (
          <Link key={index} to={`/pokemons/${pokemon.id}`}>
          <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
        {loading && <p>Loading Pokemons...</p>}
        <button onClick={fetchAllPokemons} className="Load-more">Load More</button>

    </div>
  );
};

export default Pokemons;
