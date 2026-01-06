import { Routes, Route } from "react-router";
import "./App.css";
import ChatPage from "./pages/clients/chat/ChatPage";
import { HomePage } from "./pages/clients/home/HomePage";
import { SignIn } from "./pages/clients/auth/SignIn";
import { SignUp } from "./pages/clients/auth/SignUp";
import { ToastContainer } from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";

function App() {
  const token = localStorage.getItem("accessToken");
  const conversationId = 3; // TO-DO: implement conversation
  const { toasts, removeToast } = useToast();

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast}/>

      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="chat"
          element={<ChatPage token={token} conversationId={conversationId} />}
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
