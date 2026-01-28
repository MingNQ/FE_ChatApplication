import { useTranslation } from "react-i18next";

export function AcceptFriendButton({ onAccept }) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onAccept}
      className={`px-4 py-2 rounded-md text-sm font-medium transition bg-blue-600 text-white hover:bg-blue-700`}
    >
      {t("common.accept")}
    </button>
  );
}
