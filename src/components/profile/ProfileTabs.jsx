import { useTranslation } from "react-i18next";

export function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "posts", label: "common.posts" },
    { key: "photos", label: "common.photo" },
    { key: "friends", label: "common.friends" },
  ];
  const { t } = useTranslation();

  return (
    <div className="mt-4 bg-white rounded-xl shadow flex overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex-1 py-3 text-sm font-medium transition flex items-center justify-center gap-2 ${
            activeTab === tab.key
              ? "bg-gradient-to-r from-blue-50 to-white text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>
  );
}
