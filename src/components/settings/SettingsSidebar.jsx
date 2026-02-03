import { FaGlobe, FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SETTINGS_TABS } from "./settingsTabs";

export function SettingsSidebar({activeTab, onChange}) {
  const { t } = useTranslation();
  const tabs = [
    {
      key: SETTINGS_TABS.LANGUAGE,
      label: t("common.language"),
      icon: <FaGlobe />,
    },
    {
      key: SETTINGS_TABS.APPEARANCE,
      label: t("common.appearance"),
      icon: <FaMoon />,
    },
  ];

  return (
    <aside className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
      <h3 className="font-semibold text-gray-800 mb-4">
        {t("common.settings")}
      </h3>

      <ul className="space-y-1">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
              ${
                activeTab === tab.key
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            {tab.icon}
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
