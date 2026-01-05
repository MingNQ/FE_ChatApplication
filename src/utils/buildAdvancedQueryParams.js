export function createQueryBuilder(allowedKeys = []) {
  return function (values = {}) {
    const params = new URLSearchParams();

    allowedKeys.forEach((key) => {
      if (values[key] != null && values[key] !== "") {
        params.append(key, values[key]);
      }
    });

    return params.toString();
  };
}
