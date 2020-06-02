import { getlocalStorageToken } from "../utils/getLocalStrorageToken";

let API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3100"
    : "https://invoice-gst.herokuapp.com";

export async function loginUser(username, password) {
  let userDetails = await fetch(API_URL + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
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
export async function registerUser({ username, password, name, email }) {
  let userDetails = await fetch(API_URL + "/users/register", {
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
    API_URL + "/users?isUsernameAvail=" + username
  ).then((res) => res.json());
  return isAvailable;
}

export async function getSingleUserDetails(token) {
  let response;
  await fetch(API_URL + "/users/" + token, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  })
    .then((res) => {
      console.log(res);
      // response = "then ran";
      response = res.json();
      // res.json();
    })
    .catch((err) => {
      console.log(err);
      response = "catch ran";
    });
  return response;
  // let userDetails = await fetch(API_URL + "/users/" + token, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "auth-token": token,
  //   },
  // })
  //   .then((res) => {
  //     console.log(res);
  //     return "then ran";
  //     // res.json();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return "catch ran";
  //   });

  // return userDetails;
}
