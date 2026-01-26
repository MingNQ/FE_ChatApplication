import { Routes, Route } from "react-router";
import "./App.css";
import ChatPage from "./pages/clients/chat/ChatPage";
import { HomePage } from "./pages/clients/home/HomePage";
import { SignIn } from "./pages/clients/auth/SignIn";
import { SignUp } from "./pages/clients/auth/SignUp";
import { ToastContainer } from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";
import { ProtectedRoute } from "./components/ProtectedRoute";
import FriendsPage from "./pages/clients/friends/FriendsPage";
import ProfilePage from "./pages/clients/home/ProfilePage";
import { useContext, useEffect } from "react";
import { SignalRContext } from "./contexts/SignalRContext";

function App() {
  const { toasts, removeToast } = useToast();
  const connection = useContext(SignalRContext);

  useEffect(() => {
    if (!connection) return;

    const interval = setInterval(() => {
      connection.invoke("HeartBeat");
    }, 30000);

    connection.on("UserOnline", (userId) => {
      // presenceStore.setOnline(userId);
      console.log("User online:", userId);
    });

    connection.on("UserOffline", (userId) => {
      // presenceStore.setOffline(userId);
      console.log("User offline:", userId);
    });

    return () => {
      connection.off("UserOnline");
      connection.off("UserOffline");
      clearInterval(interval);
    };
  }, [connection]);

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="friends"
          element={
            <ProtectedRoute>
              <FriendsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path=":userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
