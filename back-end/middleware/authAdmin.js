// Xác minh Admin

const TaiKhoan = require('../models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        const user = await TaiKhoan.findOne({_id: req.user.id})

        if(user.VaiTro !== 0) 
            return res.status(500).json({msg: "Chức năng này chỉ quản trị viên được phép truy cập."})
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin