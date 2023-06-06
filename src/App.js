import { useState} from 'react'
import { FiSearch} from 'react-icons/fi';
import './styles.css';

import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCEP] = useState({})

  async function handleSearch() {
    if(input === ''){
      alert("Preencha o campo com algum CEP!");
      return;
    }

    try {
      const response = await  api.get(`${input}/json`);
      setCEP(response.data);
      setInput("");
    }catch {
      alert("Ops! Ouve um erro ao procurar este CEP. Verifique se você digitou corretamente.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="tittle">Busca CEP</h1>

      <div className="container-input">
        <input 
        type="text"
        placeholder="Digite seu CEP"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Endereço: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
