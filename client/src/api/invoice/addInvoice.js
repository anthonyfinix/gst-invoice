import axios from "../../util/axios";

const addInvoice = async ({ recipient }) => {
  let response = await axios.post(`/api/invoices`, { recipient });
  let data = response.data;
  return data;
};

export default addInvoice;
