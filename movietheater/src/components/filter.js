import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/filter.css'

function FilterCategory({ onSelectCategory, apiEndpoint, defaultValue }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(defaultValue || '');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setCategories(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiEndpoint]);

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCategory(selectedId);
    if (onSelectCategory) {
      onSelectCategory(selectedId);
    }
  };

  return (
    <div className='my-2' style={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <select className='filter-btn' value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" disabled>
            Select a category
          </option>
          <option style={{ color: 'red', fontWeight: 'bold' }} value="">
            Clear
          </option>
          {categories.map((category) => (
            <option key={category.categoryID} value={category.categoryID}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default FilterCategory;