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

function App() {
  const token = localStorage.getItem("accessToken");
  const conversationId = 3; // TO-DO: implement conversation
  const { toasts, removeToast } = useToast();

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
              <ChatPage token={token} conversationId={conversationId} />
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
        
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
