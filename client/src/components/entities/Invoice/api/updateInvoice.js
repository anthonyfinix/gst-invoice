import axios from "../../../../util/axios";

export default async ({ _id, recipient, products, total, draft }) => {
  let response = await axios.put(`/api/invoices`, {
    _id,
    recipient,
    products,
    total,
    draft,
  });
  let data = response.data;
  return data;
};
