import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { getProducts, createSale } from '../api/api';
import './POSPage.css';

const POSPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === productToAdd._id
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, {
            _id: productToAdd._id,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 1
        }];
      }
    });
  };

  const handleCheckout = async (cartItems, totalAmount) => {
      setLoading(true);
    try {
      const saleItems = cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
      }));

      await createSale({ items: saleItems, totalAmount });

      alert('Sale successful!');
      setCart([]);

    } catch (err) {
        setError(err);
        console.error("Error creating sale:", err);
        alert('Checkout failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="pos-container">
      <h1>Mini POS System</h1>
      <div className="content-area">
        <ProductList products={products} onAddToCart={handleAddToCart} />
        <Cart cartItems={cart} onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default POSPage;