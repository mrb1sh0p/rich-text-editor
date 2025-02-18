import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
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
    </div>
  );
};

export default SearchBar;
