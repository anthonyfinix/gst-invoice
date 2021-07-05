import axios from "../../../../util/axios";

const addInvoice = async ({ recipient,products,total,draft }) => {
  let response = await axios.post(`/api/invoices`, { recipient,products,total,draft });
  let data = response.data;
  return data;
};

export default addInvoice;
