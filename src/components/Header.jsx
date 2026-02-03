import { Link, useNavigate } from "react-router";
import {
  FaUserFriends,
  FaHome,
  FaBell,
  FaFacebookMessenger,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-6 flex items-center bg-white border-b border-gray-200 z-50">
      <div className="flex-1 flex items-center">
        <Link to="/">
          <img
            src="images/logo.png"
            className="w-12 h-12 rounded-full object-fill hover:scale-110 transition"
          />
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="group w-24 h-15 hover:bg-gray-50 rounded-md place-content-center cursor-pointer">
          <Link
            to="/"
            className="group-hover:text-blue-600 text-gray-700 text-2xl font-medium transition"
          >
            <FaHome className="place-self-center" />
          </Link>
        </div>

        <div className="group w-24 h-15 hover:bg-gray-50 rounded-md place-content-center cursor-pointer">
          <Link
            to="/friends"
            className="group-hover:text-blue-600 text-gray-700 text-2xl font-medium transition"
          >
            <FaUserFriends className="place-self-center" />
          </Link>
        </div>

        <div className="group w-24 h-15 hover:bg-gray-50 rounded-md place-content-center cursor-pointer">
          <Link
            to="/chat"
            className="group-hover:text-blue-600 text-gray-700 text-2xl font-medium transition "
          >
            <FaFacebookMessenger className="place-self-center" />
          </Link>
        </div>

        <div className="w-24 h-15 text-gray-700 text-2xl font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md place-items-center place-content-center transition cursor-pointer">
          <FaBell />
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        <>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 focus:outline-none"
            >
              <img
                src={user?.avatar ?? "images/default-avatar.jpg"}
                className="w-10 h-10 rounded-full hover:scale-105 transition"
              />

              <FaChevronDown
                className={`text-gray-500 text-sm transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    navigate(`/${user.id}`);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {t("common.myPersonalPage")}
                </button>

                <button
                  onClick={() => {
                    navigate(`/settings`);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {t("common.settings")}
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/sign-in");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                >
                  {t("common.logout")}
                </button>
              </div>
            )}
          </div>
        </>
      </div>
    </header>
  );
}
