import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// == Import de notre commerce via lib/commerce.js
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
}
  // == On lance fetch (récupération de donnée) une fois le render affiché
  useEffect(() => {
      fetchProducts();
      fetchCart();
  }, [])

 
  
  return (
      <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        {/* On envoie notre liste de produit récupérée au composant <Products /> */}
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        {/* On envoie notre panier au composant panier <Cart /> */}
                        <Cart cart={cart}/>  
                    </Route>
                </Switch>
            </div>
      </Router>
  
  );
}

export default App;
