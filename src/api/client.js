import { getlocalStorageToken } from "../utils/getLocalStrorageToken";

export async function getAllClients() {
  let clients = await fetch("https://invoice-gst.herokuapp.com/", {
    headers: { "auth-token": getlocalStorageToken() },
  }).then((res) => res.json());
  return clients;
}

export async function getSingleClient(id) {
  let client = await fetch("https://invoice-gst.herokuapp.com/" + id, {
    headers: { "auth-token": getlocalStorageToken() },
  }).then((res) => res.json());
  return client;
}

export async function deleteSingleClient(id) {
  let client = await fetch("https://invoice-gst.herokuapp.com/" + id, {
    method: "DELETE",
    headers: { "auth-token": getlocalStorageToken() },
  }).then((res) => res.json());
  return client;
}

export async function addNewClient(data) {
  console.log(data);
  let client = await fetch("https://invoice-gst.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getlocalStorageToken(),
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      address: data.address,
      contactNumber: data.contactNumber,
      total: data.total,
    }),
  }).then((res) => res.json());
  return client;
}

export async function updateClient(data) {
  let client = await fetch("https://invoice-gst.herokuapp.com/" + data._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getlocalStorageToken(),
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      address: data.address,
      contactNumber: data.contactNumber,
    }),
  }).then((res) => res.json());
  return client;
}
export async function partialSearchClientName(searchTerm) {
  let client = await fetch("https://invoice-gst.herokuapp.com/search/" + searchTerm,{
      headers: { "auth-token": getlocalStorageToken() },
    }).then((res) => res.json());
  return client;
}
