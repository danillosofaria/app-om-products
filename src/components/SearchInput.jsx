import { useState, useEffect } from "react";
import "./SearchInput.css";

function SearchInput({ onSearch, placeholder = "Pesquisar..." }) {
  const [query, setQuery] = useState("");

  // Debounce simples: chama onSearch 500ms após o usuário parar de digitar
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <input
      type="search"
      value={query}
      placeholder={placeholder}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchInput;
