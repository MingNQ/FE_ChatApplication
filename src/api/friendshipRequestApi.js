import { http, setAuthToken } from "./http";

export async function addFriend(friendId) {
    const token = localStorage.getItem("token");
    setAuthToken(token);

    const res = await http.post("/client/friend-requests", {
        friendId: friendId
    });

    return res.data;
}