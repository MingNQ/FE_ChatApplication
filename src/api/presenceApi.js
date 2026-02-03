import { http } from "./http";

export async function getUserPresences() {
  const res = await http.get("/client/presences");
  return res.data;
}
