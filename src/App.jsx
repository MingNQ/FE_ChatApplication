import { Routes, Route } from "react-router";
import "./App.css";
import ChatPage from "./pages/clients/chat/ChatPages";

function App() {
  const token = localStorage.getItem("access_token");
  const conversationId = 3; // TO-DO: implement conversation

  return (
    <Routes>
      <Route path="chat" element={<ChatPage token={token} conversationId={conversationId} />} />
    </Routes>
  );
}

export default App;
