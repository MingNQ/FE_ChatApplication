import { http } from "./http.js";
import { createQueryBuilder } from "../utils/buildAdvancedQueryParams.js";

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
  const res = await http.get(
    `/client/conversations/${conversationId}/messages`
  );
  return res.data.result;
}
