import "./css/LanguageSwitcher.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(localStorage.getItem("i18nextLng") || "");
  }, [language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="language-selector">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label={t("switch_language")}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
