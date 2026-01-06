import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-6 flex items-center bg-white border-b border-gray-200">
      <div className="flex-1 flex items-center">
        <Link
          to="/"
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition"
        >
          My App
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <Link
          to="/chat"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Chat
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        {!user ? (
          <>
            <Link
              to="/sign-in"
              className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
            >
              Sign In
            </Link>

            <Link
              to="/sign-up"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>

              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    logout();
                    navigate("/sign-in");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
