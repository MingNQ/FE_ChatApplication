import { useTranslation } from "react-i18next";
import { Header } from "../../../components/Header";
import { LanguageSettings } from "../../../components/settings/LanguageSettings";
import { SettingsSidebar } from "../../../components/settings/SettingsSidebar";
import { AppearanceSettings } from "../../../components/settings/AppearanceSettings";
import { SETTINGS_TABS } from "../../../components/settings/settingsTabs";
import { useState } from "react";

export function SettingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(SETTINGS_TABS.LANGUAGE);

  return (
    <>
      <title>{t("common.settings")}</title>
      <Header />

      <section className="bg-gray-100 min-h-screen mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
          {/* Sidebar */}
          <div className="w-64 hidden md:block">
            <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeTab === SETTINGS_TABS.LANGUAGE && <LanguageSettings />}
            {activeTab === SETTINGS_TABS.APPEARANCE && <AppearanceSettings />}
          </div>
        </div>
      </section>
    </>
  );
}
