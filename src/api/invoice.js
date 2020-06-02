import { getlocalStorageToken } from "../utils/getLocalStrorageToken";

export async function getAllInvoices() {
  let invoices = await fetch("https://invoice-gst.herokuapp.com/invoices/", {
      headers:{
          "auth-token": getlocalStorageToken(),
      }
  }).then((res) => res.json());
  return invoices;
}
export async function addNewInvoice(data) {
  let invoice = await fetch("https://invoice-gst.herokuapp.com/invoices/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getlocalStorageToken(),
    },
    body: JSON.stringify({
      invoiceNo: data.invoiceNo,
      client: data.client,
      created: data.created,
      dueDate: data.dueDate,
      products: data.products,
      status: data.status,
      total: data.total,
    }),
  }).then((res) => res.json());
  return invoice;
}

export async function deleteSingleInvoice(id) {
  let invoice = await fetch("https://invoice-gst.herokuapp.com/invoices/" + id, {
    method: "DELETE",
    headers:{
        "auth-token": getlocalStorageToken(),
    }
  }).then((res) => res.json());
  return invoice;
}
