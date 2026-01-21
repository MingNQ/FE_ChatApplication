import { http } from "./http";

export async function getPost() {
  const res = await http.post("/client/posts/search", {
    ignorePagination: true,
  });

  return res.data;
}

export async function getPostByUserId(userId) {
  const res = await http.get("/client/posts/user/" + userId);
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

export async function getMyReactionByPostId(postId) {
  const res = await http.get(`/client/posts/${postId}/reaction/me`);
  return res.data;
}

export async function reactPost(postId, type) {
  const res = await http.post(`/client/posts/reaction`, {
    postId: postId,
    type: type,
  });

  return res.data;
}

export async function updateReactPost(postId, type, id) {
  const res = await http.put(`/client/posts/reaction/${id}`, {
    postId: postId,
    type: type,
  });

  return res.data;
}

export async function removeReactPost(postId, id) {
  const res = await http.delete(`/client/posts/reaction/${id}`, {
    postId: postId,
  });

  return res.data;
}

export async function commentPost(postId, rootId, content) {
  const res = await http.post(`/client/posts/comment`, {
    postId: postId,
    rootId: rootId,
    content: content,
  });

  return res.data;
}

export async function updateComment(postId, commentId, content) {
  const res = await http.put(`/client/posts/comment/${commentId}`, {
    postId: postId,
    content: content,
  });

  return res.data;
}

export async function deleteComment(postId, commentId) {
  const res = await http.delete(`/client/posts/${postId}/comment/${commentId}`);

  return res.data;
}