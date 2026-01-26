import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { SignalRContext } from "./SignalRContext";
import { useAuth } from "../hooks/useAuth";

export function SignalRProvider({ children }) {
  const { token } = useAuth();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (!token) {
      if (connection) {
        connection.stop();
        setConnection(null);
      }
      return;
    }

    const hub = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7187/hubs/chat", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    hub.start()
      .then(() => {
        setConnection(hub);
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
      });

    return () => {
      hub.stop();
      setConnection(null);
    };
  }, [token]);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
}
