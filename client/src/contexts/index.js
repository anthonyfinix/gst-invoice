import ClientProvider, { ClientContext } from "./clientContext";
import ProductProvider, { ProductContext } from "./productContext";
import InvoiceProvider, { InvoiceContext } from "./invoiceContext";

export default {
  contexts: { ClientContext:ClientContext, ProductContext:ProductContext, InvoiceContext:InvoiceContext },
  providers: { ClientProvider, ProductProvider, InvoiceProvider },
};
