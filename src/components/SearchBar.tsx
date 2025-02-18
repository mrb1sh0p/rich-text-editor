import "./css/Search.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";

interface SearchProps {
  isVisible?: boolean;
  toggleMenu?: () => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({
  onSearch,
  isVisible,
  toggleMenu,
}) => {
  const { t } = useTranslation("common");
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t("sidebar.search_placeholder")}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <button
        onClick={toggleMenu}
        className="menu-toggle"
      >
        {isVisible ? <FiMenu /> : <FiMenu />}
      </button>
    </div>
  );
};

export default SearchBar;
