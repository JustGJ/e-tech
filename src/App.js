import React, { useState, useEffect } from 'react';
import { Products, Navbar } from './components';

// == Import de notre commerce via commerce.js
import { commerce } from './lib/commerce';

function App() {

  // == On stocke tout nos produits récupérés grâce à fetch
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
      const { data } = await commerce.products.list();

      setProducts(data);
  }

  // == On lance fetch (récupération de donnée) une fois le render affiché
  useEffect(() => {
      fetchProducts();
  }, [])

  
  return (
    <div className="App">
        <Navbar />
        {/* On envoie notre liste de produit récupérée au composant <Products /> */}
        <Products products={products}/> 
   </div>
  );
}

export default App;
