import { getlocalStorageToken } from "../utils/getLocalStrorageToken";

export async function getAllProducts() {
  let products = await fetch("http://localhost:3100/products/", {
    headers: {
      "auth-token": getlocalStorageToken(),
    },
  }).then((res) => res.json());
  return products;
}
export async function partialSearchProducttName(searchTerm) {
  let product = await fetch(
    "http://localhost:3100/products/search/" + searchTerm,
    {
      headers: {
        "auth-token": getlocalStorageToken(),
      },
    }
  ).then((res) => res.json());
  return product;
}
export async function deleteProduct(id) {
  await fetch("http://localhost:3100/products/" + id, {
    method: "DELETE",
    headers: {
      "auth-token": getlocalStorageToken(),
    },
  }).then((res) => res.json());
}
export async function addNewProduct(data) {
  let product = await fetch("http://localhost:3100/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getlocalStorageToken(),
    },
    body: JSON.stringify({
      name: data.name,
      price: parseInt(data.price),
      sku: data.sku,
      description: data.description,
      taxRate: parseInt(data.taxRate),
    }),
  }).then((res) => res.json());
  return product;
}
export async function updateProduct(data) {
  console.log(data);
  let product = await fetch("http://localhost:3100/products/" + data._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getlocalStorageToken(),
    },
    body: JSON.stringify({
      name: data.name,
      price: data.price,
      sku: data.sku,
      description: data.description,
      taxRate: data.taxRate,
    }),
  }).then((res) => res.json());
  return product;
}
