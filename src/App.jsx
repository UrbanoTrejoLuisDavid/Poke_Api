import Header from './components/Header';
import Pokedex from './components/Pokedex';
import DatosPokemon from './components/DatosPokemon';



function App() {

  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center bg-dark">
      <Header/>
      <section className='col-12 d-flex flex-wrap'>
        <DatosPokemon url = {"132"}/>
        <Pokedex/>
      </section>
    </div>
  )
}

export default App
