import { http } from "./http";

export async function getPost() {
  const res = await http.post("/client/posts/search", {
    ignorePagination: true,
  });

  return res.data;
}

export async function createPost(request) {
  const res = await http.post("/client/posts", {
    content: request.content,
    visibility: request.visibility,
    attachmentIds: request.attachmentIds,
  });

  return res.data;
}
