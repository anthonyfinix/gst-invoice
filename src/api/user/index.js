import config from '../../globals';
export {loginUser} from "./login";

export async function registerUser({ username, password, name, email }) {
  let userDetails = await fetch(config.API_URL + "/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
      name,
    }),
  }).then((res) => {
    if (!res.headers.get("auth-token")) return res.json();
    let token = res.headers.get("auth-token");
    return res.json().then((userData) => {
      return { ...userData, token };
    });
  });
  return userDetails;
}

export async function getUsernameAvailable(username) {
  let isAvailable = await fetch(
    config.API_URL + "/users?isUsernameAvail=" + username
  ).then((res) => res.json());
  return isAvailable;
}

export async function getSingleUserDetails(token) {
  let response;
  await fetch(config.API_URL + "/users/" + token, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  })
    .then((res) => {
      response = res.json();
    })
    .catch((err) => {
      console.log(err);
      response = "Error Connecting Server";
    });
  return response;
}
