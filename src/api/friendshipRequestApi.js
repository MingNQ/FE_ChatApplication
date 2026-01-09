import { http } from "./http";

export async function getFriendRequest() {
  const res = await http.get("/client/friend-requests");
  return res.data;
}

export async function getRelatedFriends() {
  const res = await http.get("/client/friend-requests/related-friends")
  return res.data;
}

export async function getReceivedFriendRequest() {
  const res = await http.get("/client/friend-requests/received");
  return res.data;
}

export async function getFriends() {
  const res = await http.get("/client/friend-requests/friends");
  return res.data;
}

export async function addFriend(friendId) {
  const res = await http.post("/client/friend-requests", {
    friendId: friendId,
  });
  return res.data;
}

export async function acceptFriendRequest(friendRequestId) {
  const res = await http.post(
    `/client/friend-requests/${friendRequestId}/accept`
  );
  return res.data;
}

export async function rejectFriendRequest(friendRequestId) {
  const res = await http.post(
    `/client/friend-requests/${friendRequestId}/reject`
  );
  return res.data;
}

export async function cancelFriendRequest(friendRequestId) {
  const res = await http.post(
    `/client/friend-requests/${friendRequestId}/cancel`
  );
  return res.data;
}
