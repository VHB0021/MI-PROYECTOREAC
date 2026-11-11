import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactoForm from '../components/ContactoForm';
import './characters.css'
const timeLoader = 200
function Home() {
  const [characters, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const URLBASE = "https://dummyjson.com/products"; 

  useEffect(() => {
    let componenteActivo = true;
    axios.get(URLBASE)
      .then((response) => {
        if (componenteActivo) setCharacter(response.data.products);
      })
      .catch(() => {
        if (componenteActivo) setError("No se pueden cargar los personajes");
      })
      .finally(() => {
        setTimeout(()=>{
          if (componenteActivo) setLoading(false);

        },timeLoader);
      });
      
    return () => {
      componenteActivo = false;
    };
  }, []);
  // console.log(characters[0]?.id);
  if (error) {
    return (
      <div className="estado-mensaje error">
        <h2>Ups! Algo salió mal</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#8B5CF6', fontSize: '32px', fontFamily: 'Georgia' }}>
  Bienvenidos a nuestra tienda online
</h1>
      <p style={{ color: '#666666', fontSize: '18px', marginTop: '10px' }}>
        Descubri nuestra variedad de productos, explora las diferentes categorias al mejor precio del mercado. 
      </p>
      <ContactoForm />
      {/* Catálogo opcional del proyecto original */}
        {loading?(
          <div className='producto-loading'>
              <h2>Cargando Catalogo..........</h2>    
          </div>
        ):(
        <div className='productos-conteiner'>
            {
              
characters.map((articulo) => (
  <div key={articulo.id} className="producto-card">
    <img
      src={articulo.thumbnail}
      alt={articulo.title}
    />
    <h3>{articulo.title}</h3>
    <p>Precio: USD {articulo.price}</p>
    <p>Categoría: {articulo.category}</p>
  </div>
))

            }

        </div>)}
            
  </div>
  );
}
export default Home;
