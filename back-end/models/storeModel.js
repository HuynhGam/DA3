const mongoose = require('mongoose')

// Document của Collection CuaHang
const userSchema = new mongoose.Schema({
    MaCH: {
        type: String,
        required: [true, "Hãy nhập mã cửa hàng"],
    },
    TenCH: {
        type: String,
        required: [true, "Hãy nhập tên cửa hàng!"],
    },
    DiaChi: {
        type: String,
        required: [true, "Hãy nhập địa chỉ!"]
    },
}, 

{
    timestamps: true  //Thời gian tạo các Document
})

module.exports = mongoose.model("CuaHang", userSchema)

