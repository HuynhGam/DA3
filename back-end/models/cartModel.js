const mongoose = require('mongoose')

// Document của Collection GioHang
const userSchema = new mongoose.Schema({
    
    TenMonAn: {
        type: String,
        required: [true]
    },
    SoLuong: {
        type: Number,
        required: [true]
    },
    ThanhTien: {
        type: Number,
        required: [true]
    },
    user_id: {
        type: String,
        required: [true]
    }
})

module.exports = mongoose.model("GioHang", userSchema)

