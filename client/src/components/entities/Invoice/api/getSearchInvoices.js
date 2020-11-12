import axios from "../../../../util/axios";

const getSearchInvoices = async (query) => {
  let response = await axios.get(`/api/invoices/search?q=${query}`);
  let data = response.data;
  return data;
};

export default getSearchInvoices;
