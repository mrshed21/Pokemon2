import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAllPokemons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pokemons.length}&limit=5`);
      const data = await res.json();

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
      console.log(detailed);
    } catch (err) {
      console.error(err);
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
        {loading && <p>Loading Pokemons...</p>}
      <div className="PokemonList">
        {pokemons.map((pokemon, index) => (
            <Link to={`/pokemons/${pokemon.id}`}>
          <PokemonCard key={index} pokemon={pokemon} />
          </Link>
        ))}
      </div>
        <button onClick={fetchAllPokemons} className="Load-more">Load More</button>

    </div>
  );
};

export default Pokemons;
