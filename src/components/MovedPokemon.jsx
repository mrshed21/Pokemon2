import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


// Simple seeded random function for consistent positions
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function PokemonFloating() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=75");
        const data = await res.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    }
    fetchPokemon();
  }, []);

  const pokemonPositions = useMemo(() => {
    return pokemonList.map((_, index) => {
      // Full screen distribution
      const randomX = seededRandom(index * 2) * 100;
      const randomY = seededRandom(index * 3) * 100; // Full height
      const delay = seededRandom(index * 5) * 15;
      const duration = seededRandom(index * 7) * 20 + 20;
      const size = seededRandom(index * 11) * 15 + 40; // Smaller sizes (20-35px)
      return { randomX, randomY, delay, duration, size };
    });
  }, [pokemonList]);

  return (
    <div className="pokemon-container-full">
      {pokemonList.map((pkm, index) => {
        const { randomX, randomY, delay, duration, size } = pokemonPositions[index];

        return (
          <img
            key={index}
            className="floating-pokemon-bg"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`, // Use top instead of bottom for full screen
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${index + 1}.gif`}
            alt={pkm.name}
            title={pkm.name}
            onClick={() => navigate(`/pokemons/${index + 1}`)}
          />
        );
      })}
    </div>
  );
}
