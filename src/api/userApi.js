import { http } from "./http";

export async function getUsers(currentUserId) {
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
          value: currentUserId,
        },
      ],
    },
  });

  return res.data;
}
