const TaiKhoan = require('../models/userModel')

const authSeller = async (req, res, next) => {
    try {
        const user = await TaiKhoan.findOne({_id: req.user.id})

        if(user.VaiTro !== 2) 
            return res.status(500).json({msg: "Chức năng này chỉ người bán được phép truy cập."})
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authSeller