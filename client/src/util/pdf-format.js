export default (type, data) => {
  return format[type](data);
};
const getTable = (products) => {
  let headers = Object.keys(products[0]);
  let widths = headers.map(() => "*");
  let data = products.map((product) => {
    return Object.values(product);
  });
  return { headerRows: 1, widths, body: [headers, ...data] };
};
let format = {
  invoice: (data) => {
    let table = getTable(data.products);
    console.log(table);
    return {
      content: [
        {
          columns: [
            {
              width: "25%",
              text: "Invoice: 2499\n\n\n\n",
            },
            {
              widht: "50%",
              text: "",
            },
            {
              width: "25%",
              text: data.invoiceDate,
            },
          ],
        },
        {
          columns: [
            {
              width: "*",
              text: `to\n${data.recipient.name}\n${data.recipient.email}\n\n\n`,
            },
          ],
        },
        {
          table: table,
        },
      ],
    };
  },
};
