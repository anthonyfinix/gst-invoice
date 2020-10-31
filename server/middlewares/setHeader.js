module.exports = async (req, res, next){
    if (process.env.NODE_ENV === "development") res.set({ "Access-Control-Expose-Headers": "x-token" });
    next();
}