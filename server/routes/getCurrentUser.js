module.exports = (req, res) => {
    if(!req.user) return res.json({error:'You are not Registered'})
    res.json({
        name:req.user.name,
        username:req.user.username,
        email:req.user.email
    })
};
