import "./css/Search.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";

interface SearchProps {
  toggleMenu?: () => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({
  onSearch,
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
      <button onClick={toggleMenu} className="side-toggle">
        <FiMenu />
      </button>
    </div>
  );
};

export default SearchBar;
