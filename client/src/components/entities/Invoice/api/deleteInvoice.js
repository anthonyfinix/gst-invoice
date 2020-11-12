import axios from "../../../../util/axios";

const deleteInvoice = async (id) => {
  let response = await axios.delete(`/api/invoices?id=${id}`);
  let data = response.data;
  return data;
};

export default deleteInvoice;
