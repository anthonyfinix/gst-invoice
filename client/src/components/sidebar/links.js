export default {
  dashboard: {
    entity:"dashboard",
    title: "Dashboard",
    link: "/products",
    provider: "ProductProvider",
    context: "ProductContext",
    schema: {
      name: "string",
    },
  },
  products: {
    entity:"product",
    title: "Products",
    link: "/products",
    provider: "ProductProvider",
    context: "ProductContext",
    schema: {
      name: "string",
    },
  },
  clients: {
    entity:"client",
    title: "Clients",
    link: "/clients",
    provider: "ClientProvider",
    context: "ClientContext",
    schema: {
      name: "string",
    },
  },
  invoices: {
    entity:"invoice",
    title: "Invoices",
    link: "/invoices",
    provider: "InvoiceProvider",
    context: "InvoiceContext",
    schema: {
      name: "string",
    },
  },
};
