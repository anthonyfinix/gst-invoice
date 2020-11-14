const Invoice = require("../../../models/invoice");
const User = require("../../../models/user");
const validator = require("../../../util/validation/index");

const generateInvoiceNumber = async ({ invoiceCount }) => {
  let date = Date.now();
  let dd = new Date(date).getDate().toString().padStart(2, "0");
  let mm = new Date(date).getMonth().toString().padStart(2, "0");
  let yy = new Date(date).getFullYear().toString().slice(-2);
  invoiceNumber = dd + mm + yy + (invoiceCount + 1).toString();
  return invoiceNumber;
};

module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { recipient, products, total, draft } = req.body;
  // validate
  let { error } = validator.invoice.validate({
    recipient,
    products,
    total,
    draft,
  });
  // handle validation error
  if (error) return res.json({ error: error.details[0].message });


  let invoice;
  if (!draft) {
    let invoiceNo = await generateInvoiceNumber(req.user);
    invoice = new Invoice({
      invoiceNo,
      recipient,
      products,
      issuedOn: Date.now(),
      total,
      draft,
    });
    await User.updateOne(
      { username: req.user.username },
      { $inc: { invoiceCount: 1 } }
    );
  } else {
    invoice = new Invoice({ recipient, products, total, draft });
  }

  let newInvoice = await invoice.save();
  res.json(newInvoice);
};
