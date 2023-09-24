const CheckAdmin = async (req, res, next) => { 
    res.json({
        message: 'Admin check successful',
        isAdmin: true
    })
}

module.exports = CheckAdmin;