const config = {};
if (process.env.NODE_ENV !== "production") {
  config.API_URL = "http://localhost:3100";
} else if (process.env.NODE_ENV !== "production") {
  config.API_URL = "https://invoice-gst.herokuapp.com";
}

export default config;