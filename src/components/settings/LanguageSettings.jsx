import { useTranslation } from "react-i18next";

export function LanguageSettings() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{t("common.language")}</h2>

      <div className="space-y-3">
        {languages.map((lang) => (
          <label
            key={lang.code}
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <span>{lang.label}</span>
            <input
              type="radio"
              name="language"
              checked={i18n.language === lang.code}
              onChange={() => i18n.changeLanguage(lang.code)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
