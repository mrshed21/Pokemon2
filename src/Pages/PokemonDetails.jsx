import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import backImage from "../assets/123.gif";
const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [bgCurrent, setBgCurrent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchPokemonDetails = async () => {
      try {
        if (!id || isNaN(id)) navigate("/pokemons");
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) navigate("/pokemons");
        const data = await res.json();
        if (!mounted) return;
        const imgs = [
          data?.sprites?.other?.home?.front_default,
          data?.sprites?.front_default,
          data?.sprites?.back_default,
          data?.sprites?.other?.home?.front_shiny,
          data?.sprites?.other?.showdown?.front_default,
          data?.sprites?.other?.showdown?.back_default,
          data?.sprites?.other?.["official-artwork"]?.front_default,
        ].filter(Boolean);
        setPokemon(data);
        setCurrentId(data.id);
        setAllImages(imgs);
        if (imgs.length) {
          setSelectedImage(imgs[0]);
          setBgCurrent(imgs[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPokemonDetails();
    return () => mounted = false 
  }, [id]);

  useEffect(() => {
    if (!pokemon || !pokemon.types) return;
    const fetchSuggestions = async () => {
      try {
        const mainType = pokemon.types[0].type.name;
        const res = await fetch(`https://pokeapi.co/api/v2/type/${mainType}`);
        const typeData = await res.json();
        const sameTypePokemon = typeData.pokemon
          .filter((p) => p.pokemon.name !== pokemon.name)
          .map((p) => p.pokemon)
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
        console.log(sameTypePokemon);
        const detailedSuggestions = await Promise.all(
          sameTypePokemon.map(async (p) => {
            const res = await fetch(p.url);
            const detail = await res.json();
            return {
              id: detail.id,
              name: detail.name,
              sprite: detail.sprites.other.showdown.front_default,
              types: detail.types.map((t) => t.type.name),
            };
          })
        );

        setSuggestions(detailedSuggestions);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [pokemon]);

  useEffect(() => {
    if (!selectedImage) return;
    if (selectedImage === bgCurrent) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBgCurrent(selectedImage);
  }, [selectedImage, bgCurrent]);

  const bgFallback =
    (pokemon && pokemon.sprites?.other?.home?.front_default) ||
    (allImages[0] ?? "");

  // Navigation functions
  const goToPrevious = () => {
    if (currentId && currentId > 1) {
      navigate(`/pokemons/${currentId - 1}`);
    }
  };

  const goToNext = () => {
    if (currentId && currentId < 1010) {
      // Total Pokemon count (approximate)
      navigate(`/pokemons/${currentId + 1}`);
    }
  };

  const handleSuggestionClick = (suggestionId) => {
    navigate(`/pokemons/${suggestionId}`);
  };

  return (
    <>
      <div className="PokemonDetailsPage">
        <div
          className="bg-layer current"
          style={{
            backgroundImage: `url('${bgFallback}')`,
            opacity: 0.2,
          }}
        />

        <div className="Back-link">
          <Link to="/pokemons">
            ← Back to List <img src={backImage} alt="" />
          </Link>
        </div>

        {/* Navigation Arrows */}
        <div
          className={`nav-arrow prev ${currentId <= 1 ? "disabled" : ""}`}
          onClick={goToPrevious}
          title="Previous Pokemon"
        >
          ←
        </div>
        <div
          className={`nav-arrow next ${currentId >= 1010 ? "disabled" : ""}`}
          onClick={goToNext}
          title="Next Pokemon"
        >
          →
        </div>

        <div className="PokemonDetails">
          {pokemon ? (
            <>
              <div className="left-section">
                <h2>{pokemon.name}</h2>

                <div className="main-image-wrapper">
                  <img
                    className="main-image"
                    src={selectedImage || bgFallback}
                    alt={pokemon.name}
                  />
                </div>

                <div className="thumbnails">
                  {allImages.length ? (
                    allImages.map((imgSrc, idx) => (
                      <img
                        key={idx}
                        src={imgSrc}
                        alt={`${pokemon.name}-thumb-${idx}`}
                        className={`thumbnail ${
                          selectedImage === imgSrc ? "active" : ""
                        }`}
                        onClick={() => setSelectedImage(imgSrc)}
                        loading="lazy"
                      />
                    ))
                  ) : (
                    <p>No thumbnails available</p>
                  )}
                </div>
              </div>

              <div className="right-section">
                <div className="Basic-info">
                  <p className="Height">Height: {pokemon.height}</p>
                  <p className="Weight">Weight: {pokemon.weight}</p>
                </div>

                <div className="Stats">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="Stat-info">
                        <span>{stat.stat.name}</span>
                        <span className={"Stat-value"}>{stat.base_stat}</span>
                      </div>
                      <div>
                        <div
                          className="Stat-bar"
                          style={{ width: `${(stat.base_stat / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="pokemon-suggestions fade-in">
          <h3 className="suggestions-title">Similar Pokemon</h3>
          <div className="suggestions-grid">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="suggestion-card"
                onClick={() => handleSuggestionClick(suggestion.id)}
              >
                <img
                  src={suggestion.sprite}
                  alt={suggestion.name}
                  loading="lazy"
                />
                <h3>{suggestion.name}</h3>
                <div className="suggestion-types">
                  {suggestion.types.map((type) => (
                    <span key={type} className="suggestion-type">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
