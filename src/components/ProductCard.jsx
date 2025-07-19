// /src/components/ProductCard.jsx (Corrected Version)

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductCard = ({ product, viewMode }) => {
  const dispatch = useDispatch();

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="flex bg-white p-4 rounded-lg shadow-md w-full items-center">
        {/* Use product.thumbnail instead of product.image */}
        <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-contain mr-4"/>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <p className="text-gray-500 text-sm truncate">{product.description}</p>
          <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 ml-4 whitespace-nowrap"
        >
          Add to Cart
        </button>
      </div>
    );
  }

  // Grid View Layout (Default)
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="h-48 w-full mb-4 flex items-center justify-center">
        {/* Use product.thumbnail instead of product.image */}
        <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="text-md font-semibold text-gray-800 flex-grow">{product.title}</h3>
        <p className="text-xl font-bold text-blue-600 my-2">${product.price}</p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;