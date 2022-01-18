const mongoose = require('mongoose')

// Document của Collection TaiKhoan
const userSchema = new mongoose.Schema({
    HoTen: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    Email: {
        type: String,
        required: [true, "Vui lòng nhập email của bạn!"],
        trim: true,
        unique: true
    }, // Email là duy nhất và không được trùng
    MatKhau: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu!"]
    },
    SDT:{
        type: String,
        equired: [true, "Vui lòng nhập số điện thoại!"]
    },
    DiaChi:{
        type: String
    },
    VaiTro: {
        type: Number,
        default: 1 // 0 = admin, 1 = user, 2 = seller
    },
    // avatar: {
    //     type: String,
    //     default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    // }
}, {
    timestamps: true  //Thời gian tạo các Document
})

module.exports = mongoose.model("TaiKhoan", userSchema)

