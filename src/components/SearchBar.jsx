import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full mb-6">
      <input
        type="text"
        className="select-input pl-10"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ backgroundImage: 'none', cursor: "text" }}
      />
    </div>
  );
};

export default SearchBar;
