import React, { useState, useEffect } from 'react';
import { Products, Navbar } from './components';

// == Import de notre commerce via commerce.js
import { commerce } from './lib/commerce';

function App() {

  // == On stocke tout nos produits récupérés grâce à fetch
  const [products, setProducts] = useState([]);
  // == Ajout du panier 
  const [cart, setCart] = useState({});

  // == On récupère notre boutique commerce.js
  const fetchProducts = async () => {
      const { data } = await commerce.products.list();

      setProducts(data);
  }

  // == On récupère notre panier sur commerce.js
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
}

  // == Ajout de l'item dans le panier 
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart)
    console.log(cart);
}
  // == On lance fetch (récupération de donnée) une fois le render affiché
  useEffect(() => {
      fetchProducts();
      fetchCart();
  }, [])

 
  
  return (
    <div className="App">
        <Navbar totalItems={cart.total_items} />
        {/* On envoie notre liste de produit récupérée au composant <Products /> */}
        <Products products={products} onAddToCart={handleAddToCart} /> 
   </div>
  );
}

export default App;
