import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ placeholder = "Pesquisar festas, picos ou locais...", onSearch }) {
  const [q, setQ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(q);
  }

  function clear() {
    setQ("");
    if (onSearch) onSearch("");
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="home-search" className="sr-only">Pesquisar</label>
      <div className="search-inner">
        <span className="search-icon"><ion-icon name="search-outline"></ion-icon></span>
        <input
          id="home-search"
          className="search-input"
          type="search"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Pesquisar"
        />
        {q ? (
          <button type="button" className="search-clear" onClick={clear} aria-label="Limpar busca">
            ×
          </button>
        ) : null}
      </div>
    </form>
  );
}
