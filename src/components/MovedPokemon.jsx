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
  const seed = useMemo(() => Math.random() * 10000, []);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=75");
        const data = await res.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }
    fetchPokemon();
  }, []);

  const pokemonPositions = useMemo(() => {
    return pokemonList.map((_, index) => {
      const base = seed + index;

      const randomX = seededRandom(base * 2) * 100;
      const randomY = seededRandom(base * 3) * 100; 
      const delay = seededRandom(base * 5) * 15;
      const duration = seededRandom(base * 7) *3 +3;
      const size = seededRandom(base * 11) * 15 + 40; 
      const moveX1 = (seededRandom(base * 13) - 0.5) * 60; 
      const moveY1 = (seededRandom(base * 17) - 0.5) * 60; 
      const moveX2 = (seededRandom(base * 19) - 0.5) * 60;
      const moveY2 = (seededRandom(base * 23) - 0.5) * 60;
      const rotate = (seededRandom(base * 29) - 0.5) * 10; 

      return {
        randomX,
        randomY,
        delay,
        duration,
        size,
        moveX1,
        moveX2,
        moveY1,
        moveY2,
        rotate,
      };
    });
  }, [pokemonList]);

  return (
    <div className="pokemon-container-full">
      {pokemonList.map((pkm, index) => {
        const {
          randomX,
          randomY,
          delay,
          duration,
          size,
          moveX1,
          moveX2,
          moveY1,
          moveY2,
          rotate,
        } = pokemonPositions[index];

        return (
          <img
            key={index}
            className="floating-pokemon-bg"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
              "--mx1": `${moveX1}px`,
              "--my1": `${moveY1}px`,
              "--mx2": `${moveX2}px`,
              "--my2": `${moveY2}px`,
              "--rot": `${rotate}deg`,
            }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
              index + 1
            }.gif`}
            alt={pkm.name}
            title={pkm.name}
            onClick={() => navigate(`/pokemons/${index + 1}`)}
          />
        );
      })}
    </div>
  );
}
