import config from "../../globals";

export async function loginUser(username, password) {
  return await fetch(config.API_URL + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status === 200 && res.headers.get("auth-token")) {
        let token = res.headers.get("auth-token");
        return res.json().then((userDetails) => {
          return { userDetails, token };
        });
      } else {
        return res.json();
      }
    })
    .catch((error) => {
      return error;
    });
}
