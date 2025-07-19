// /src/pages/ProductListPage.jsx (New Interactive Version)

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setViewMode } from '../features/productSlice';
import ProductCard from '../components/ProductCard';

// A simple skeleton component for the loading state
const ProductSkeleton = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full animate-pulse">
        <div className="flex items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
          <div className="flex-grow">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-48 w-full bg-gray-200 rounded-md mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};


const ProductListPage = () => {
  const dispatch = useDispatch();
  const { items, status, searchTerm, viewMode } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Explore Our Products
        </h1>

        {/* NEW Icon-based View Toggles */}
        <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-full">
          <button 
            onClick={() => dispatch(setViewMode('grid'))} 
            className={`p-2 rounded-full transition-colors duration-300 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            aria-label="Grid View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => dispatch(setViewMode('list'))} 
            className={`p-2 rounded-full transition-colors duration-300 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            aria-label="List View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Listings or Loading/Empty State */}
      {status === 'loading' ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
          {[...Array(8)].map((_, i) => <ProductSkeleton key={i} viewMode={viewMode} />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search term.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;