import i18next from "i18next";
import { useState } from "react";

const languageOptions = [
  { language: "English", code: "en" },
  { language: "Vietnam", code: "vi" },
];

export function LanguageSwitcher() {
  const [language, setLanguage] = useState(i18next.language);
  const handleChangeLanguage = (e) => {
    const lan = e.target.value;
    setLanguage(lan);
    i18next.changeLanguage(lan);
  };

  return (
    <select
      id="language"
      value={language}
      onChange={handleChangeLanguage}
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-700 dark:focus:ring-opacity-50"
    >
      {languageOptions.map(({ language, code }, key) => (
        <option value={code} key={key}>
          {language}
        </option>
      ))}
    </select>
  );
}
