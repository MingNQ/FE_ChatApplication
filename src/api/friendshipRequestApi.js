import { http } from "./http";

export async function getFriendRequest(userId) {
  const res = await http.post("/client/friend-requests/search", {
    operator: "eq",
    field: "friendId",
    value: userId,
  });

  return res.data.result;
}

export async function addFriend(friendId) {
  const res = await http.post("/client/friend-requests", {
    friendId: friendId,
  });

  return res.data;
}

export async function acceptFriendRequest(friendRequestId) {
  const res = await http.post(
    `/client/friend-request/${friendRequestId}/accept`
  );

  return res.data;
}

export async function rejectFriendRequest(friendRequestId) {
  const res = await http.post(
    `/client/friend-request/${friendRequestId}/reject`
  );

  return res.data;
}

export async function cancelFriendRequest(friendRequestId) {
  const res = await http.post(
    `/client/friend-request/${friendRequestId}/cancel`
  );

  return res.data;
}
