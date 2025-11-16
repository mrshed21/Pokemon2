
const PokemonCard = ({pokemon}) => {
  return (
    <div className="PokemonCard">
        <h2>{pokemon.name}</h2>
        <img className="Pokemon-img" src={pokemon.sprite} alt={pokemon.name} />
        <p> {pokemon.types.map(type => <span className="type" key={type}>{type} </span>)}</p>
    </div>
  )
}

export default PokemonCard
