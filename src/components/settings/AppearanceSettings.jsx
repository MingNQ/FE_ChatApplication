import { useState } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function AppearanceSettings() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState("light");

  const themes = [
    { key: "light", label: t("appearance.light"), icon: <FaSun /> },
    { key: "dark", label: t("appearance.dark"), icon: <FaMoon /> },
    { key: "system", label: t("appearance.system"), icon: <FaDesktop /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{t("common.appearance")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themes.map((item) => (
          <button
            key={item.key}
            onClick={() => setTheme(item.key)}
            className={`border rounded-xl p-4 flex flex-col items-center gap-2 transition
              ${
                theme === item.key
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
