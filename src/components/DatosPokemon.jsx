import React from 'react';
import Tipo from './Tipo';
import "./DatosPokemon.css"; // Importa el archivo CSS

const DatosPokemon = ({ pokemon }) => {
  if (!pokemon) return null;

  const { id, name, sprites, types } = pokemon;

  return (
    <div className='sticky col-lg-3 mt-5 p-3 d-flex flex-column align-items-center'>
      <p className='col-12 text-end fs-1 fw-bold text-success'>#{id}</p>
      <img src={sprites.other["official-artwork"].front_default} alt={name} className='col-lg-10 col-sm-7' />
      <p className='uppercase bold red'>{name.toUpperCase()}</p>
      <div className='d-flex col-12 justify-content-evenly flex-wrap'>
        {types.map((type, index) => (
          <Tipo key={index} tipo={type.type.name} />
        ))}
      </div>
    </div>
  );
}

export default DatosPokemon;