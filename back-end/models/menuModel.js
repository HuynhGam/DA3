const mongoose = require('mongoose')

// Document của Collection Menu
const userSchema = new mongoose.Schema({
    MaCH: {
        type: String,
        required: [true, "Hãy nhập mã cửa hàng"]
    },
    MaMonAn: {
        type: String,
        required: [true, "Hãy nhập mã món ăn"]
    },
    TenMonAn: {
        type: String,
        required: [true, "Hãy nhập tên món ăn!"]
    },
    GiaBan: {
        type: Number,
        required: [true, "Hãy nhập giá bán sản phẩm!"]
    },
})

module.exports = mongoose.model("Menu", userSchema)

