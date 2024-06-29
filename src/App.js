import "./styles.css";
import { useState, useEffect } from "react";
const pageSize = 20;
export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selected, setSelected] = useState();
  const [sprite, setSprite] = useState();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (selected) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`)
        .then((response) => response.json())
        .then((vals) => {
          console.log(vals);
          setSprite(vals.sprites.front_default);
        });
    }
  }, [selected]);
  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((vals) => {
        console.log("all endpoint");
        setPokemon(vals.results.map((result) => result.name));
      });
  }, [offset]);

  function PokemonOption(pokemonName) {
    return (
      <option key={pokemonName.pokemonName}>{pokemonName.pokemonName}</option>
    );
  }

  function handleButtonClick() {
    setOffset((o) => o + pageSize);
    setSprite();
  }

  console.log(selected);
  return (
    <div className="App">
      {selected !== "none" && sprite ? <img src={sprite} /> : ""}
      <br />
      <select
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        <option key="none" value="none">
          {" "}
          none selected
        </option>
        {pokemon.map((name) => (
          <PokemonOption key={name} pokemonName={name} />
        ))}
      </select>
      <br />
      <div>
        <button onClick={handleButtonClick}>get more pokemon options!</button>
      </div>
    </div>
  );
}
