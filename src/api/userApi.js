import { http, setAuthToken } from "./http";

export async function getUsers() {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  setAuthToken(token);

  var res = await http.post("client/users/search", {
    advancedFilter: {
      logic: "and",
      filters: [
        {
          field: "id",
          operator: "neq",
          value: 1,
        },
        {
          field: "id",
          operator: "neq",
          value: Number.parseInt(currentUser.id),
        },
      ],
    },
  });

  return res.data;
}
