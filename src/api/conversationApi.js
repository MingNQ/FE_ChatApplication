import { http } from "./http.js";

export async function getConversations() {
  const res = await http.get("/client/conversations");
  return res.data;
}

export async function getConversationById(id) {
  const res = await http.get(`/client/conversations/${id}`);
  return res.data;
}

export async function getConversationByFriendId(friendId) {
  const res = await http.get(`/client/conversations/friends/${friendId}`);
  return res.data;
}

export async function getMessages(conversationId) {
  const res = await http.get(
    `/client/conversations/${conversationId}/messages`
  );
  return res.data;
}

export async function createConversation(type, name, memberIds) {
  const res = await http.post("/client/conversations", {
    type: type,
    name: name,
    memberIds: memberIds,
  });
  return res.data;
}

export async function addMember(id, userId) {
  const res = await http.post(`/client/conversations/${id}`, {
    userId: userId,
  });
  return res.data;
}
