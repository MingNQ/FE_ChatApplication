import { http, setAuthToken } from "./http.js";
import { createQueryBuilder } from "../utils/buildAdvancedQueryParams.js";

const token = localStorage.getItem("access_token");

export async function getConversations() {
  const params = new createQueryBuilder(["ignorePagination"]);
  const res = await http.post(
    "/client/conversations/search",
    params({
      ignorePagination: true,
    })
  );
  return res.result;
}

export async function getMessages(conversationId) {
  setAuthToken(token);
  const res = await http.get(
    `/client/conversations/${conversationId}/messages`
  );
  return res.data.result;
}
