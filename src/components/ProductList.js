import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="product-items">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;