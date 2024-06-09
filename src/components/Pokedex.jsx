import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PokemonCard from "./PokemonCard";
import DatosPokemon from "./DatosPokemon";

const Pokedex = () => {
  const [listaPokemons, setListaPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0); // Número de Pokémon ya cargados
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    const leerPokemons = async () => {
      setLoading(true);
      try {
        const datosSinFormato = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        const datosJson = await datosSinFormato.json();

        let pokemons = await Promise.all(
          datosJson.results.map(async (pokemon) => {
            const datosPokemonRaw = await fetch(pokemon.url);
            const datosPokemon = await datosPokemonRaw.json();
            return datosPokemon;
          })
        );

        setListaPokemons((prevPokemons) => [...prevPokemons, ...pokemons]);
      } catch (error) {
        Swal.fire("Error", "No se pudo conectar al API", "error");
        console.error(error);
      }
      setLoading(false);
    };

    leerPokemons();
  }, [offset]);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom && !loading) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  useEffect(() => {
    // Load initial pokemons
    const loadInitialPokemons = async () => {
      try {
        setLoading(true);
        const initialData = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`);
        const initialJson = await initialData.json();

        let initialPokemons = await Promise.all(
          initialJson.results.map(async (pokemon) => {
            const datosPokemonRaw = await fetch(pokemon.url);
            const datosPokemon = await datosPokemonRaw.json();
            return datosPokemon;
          })
        );

        setListaPokemons(initialPokemons);
      } catch (error) {
        Swal.fire("Error", "No se pudo conectar al API", "error");
        console.error(error);
      }
      setLoading(false);
    };

    loadInitialPokemons();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Se debe dejar el array de dependencias vacío para que este efecto solo se ejecute una vez

  return (
    <section className="col-sm-12 col-lg-8 d-flex justify-content-center flex-wrap z-1 mt-5">
      {listaPokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} onSelect={handlePokemonSelect} />
      ))}
      <DatosPokemon pokemon={selectedPokemon} />
    </section>
  );
};

export default Pokedex;
