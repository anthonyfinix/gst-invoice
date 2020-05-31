module.exports = {
  prod: {
    mongodb: {
      uri:
        "mongodb+srv://anthonyfinix:anthonyfinix@123@practicecluster-6usqg.gcp.mongodb.net/gstInvoice?retryWrites=true&w=majority",
    },
  },
  dev: {
    mongodb: {
      uri: "'mongodb://127.0.0.1:27017/gstinvoice'",
    },
  },
};
