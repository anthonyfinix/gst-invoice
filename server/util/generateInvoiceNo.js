module.exports = async ({ invoiceIssuedCount }) => {
    let date = Date.now();
    let dd = new Date(date).getDate().toString().padStart(2, "0");
    let mm = new Date(date).getMonth().toString().padStart(2, "0");
    let yy = new Date(date).getFullYear().toString().slice(-2);
    invoiceNumber = dd + mm + yy + (invoiceIssuedCount + 1).toString();
    return invoiceNumber;
  };