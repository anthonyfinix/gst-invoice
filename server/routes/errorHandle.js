module.exports = (error, req, res, next)=>{
    res.status(res.statusCode || 500);
    res.json({
        error: error.message
    })
}