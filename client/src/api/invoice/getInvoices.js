import axios from "../../util/axios";

const getInvoices = async () => {
  let response = await axios.get(`/api/invoices`);
  let data = response.data;
  return data;
};

export default getInvoices;
