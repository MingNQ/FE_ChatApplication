import * as signalR from "@microsoft/signalr";

let connection = signalR.HubConnection | null;

export function createChatHub(token) {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7187/hubs/chat", {
      accessTokenFactory: () => token,
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true
    })
    .withAutomaticReconnect()
    .build();

  return connection;
}

export function getChatHub() {
  if (!connection) throw new Error("Hub not initialized");
  return connection;
}
