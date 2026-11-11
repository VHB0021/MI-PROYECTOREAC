
function Acercade(){
const articulosDestacados = [
  {
    id: 1,
    nombre: "Auriculares inalámbricos",
    precio: 18500,
    categoria: "Tecnología",
    imagen: `${import.meta.env.BASE_URL}catalogo/auriculares.jpg`
  },
  {
    id: 2,
    nombre: "Perfume",
    precio: 25000,
    categoria: "Belleza",
    imagen: `${import.meta.env.BASE_URL}catalogo/perfume.jpg`
  },
  {
    id: 3,
    nombre: "Cartera",
    precio: 32000,
    categoria: "Accesorios",
    imagen: `${import.meta.env.BASE_URL}catalogo/cartera.jpg`
  }
];
   return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      
<h1 style={{ color: '#8B5CF6', fontSize: '32px' }}>
  Acerca de nuestra tienda
</h1>

<p style={{ color: '#666', fontSize: '18px', marginTop: '10px' }}>
  Bienvenidos a Mi primera página, una tienda online
  donde encontrarás una gran variedad de artículos
  para diferentes gustos y necesidades.
</p>

Conocé nuestra selección especial de artículos,
  con imágenes, descripciones y precios.
<h2 style={{ color: '#8B5CF6', marginTop: '30px' }}>
  Nuestro catálogo destacado
</h2>

<div className="productos-conteiner">
  {articulosDestacados.map((articulo) => (
    <div key={articulo.id} className="producto-card">
      <img src={articulo.imagen} alt={articulo.nombre} />
      <h3>{articulo.nombre}</h3>
      <p>Precio: ${articulo.precio}</p>
      <p>Categoría: {articulo.categoria}</p>
    </div>
  ))}
</div>
<h2 style={{ color: '#8B5CF6', marginTop: '30px' }}>
  ¿Qué ofrecemos?
</h2>

<p>
  Ofrecemos artículos de belleza, tecnología,
  accesorios, productos para el hogar y mucho más.
  Nuestro objetivo es brindar una experiencia
  de compra sencilla, práctica y agradable.
</p>

    </div>
  );
}

export default Acercade;
