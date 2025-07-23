import React, { useState } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: Props) {
  const [term, setTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
    onSearch(event.target.value); // Llama a la función de búsqueda en App.tsx
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar películas por título..."
        value={term}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;