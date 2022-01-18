const CuaHang = require("../models/storeModel")
const Menu = require("../models/menuModel")
const GioHang = require("../models/cartModel")

const storeCtrl = {
// Thêm cửa hàng
    create_store: async(req, res) => {
        try{
            const {MaCH, TenCH, DiaChi} = req.body

            if(!MaCH|| !TenCH || !DiaChi) 
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            }
        
            const Ma = await CuaHang.findOne({MaCH})
            const Ten = await CuaHang.findOne({TenCH})
            if(Ma && Ten)
            {
                return res.status(400).json({msg:"Cửa hàng này đã tồn tại"})
            }        
            //Tạo user mới
            const newShop = {
                MaCH, TenCH, DiaChi
            }  

            await CuaHang.create(newShop); //Lưu vào DB

            res.json({msg: "Thêm cửa hàng thành công"})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },  
// Chỉnh sửa thông tin cửa hàng
    update_store: async(req, res) => {
        try{
            const {MaCH, TenCH, DiaChi} = req.body

            if(!MaCH|| !TenCH || !DiaChi)
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            }
            // Tìm kiếm và chỉnh sửa
            await CuaHang.findOneAndUpdate({_id: req.params.id}, {
                MaCH, TenCH, DiaChi
            })

            res.json({msg: "Cập nhật thành công"})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
// Tạo menu
    create_food: async(req,res) => {
        try{
            const {MaCH, MaMonAn, TenMonAn, GiaBan} = req.body

            if(!MaCH|| !MaMonAn || !TenMonAn || !GiaBan) 
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            }
                  
            const Ma = await Menu.findOne({MaMonAn})
            const Ten = await Menu.findOne({TenMonAn})
                        
            if(Ma && Ten)
            {
                return res.status(400).json({msg:"Bạn đã có món ăn này trong cửa hàng rồi"})
            }        

            const newFood = {
                MaCH, MaMonAn, TenMonAn, GiaBan
            }  
           
            await Menu.create(newFood); //Lưu vào DB

            res.json({msg: "Thêm thành công"})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
// Lấy tất cả menu
    get_menu: async(req, res) => {
        try {
            const menu = await Menu.find({MaCH: req.params.id}) // Tìm thông tin theo mã cửa hàng
            res.json(menu)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Chỉnh sửa thông tin cửa hàng
    update_menu: async(req, res) => {
        try{
            const {TenMonAn, GiaBan} = req.body

            if(!TenMonAn || !GiaBan)
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            }
        
            await Menu.findOneAndUpdate({_id: req.params.id}, {
                TenMonAn, GiaBan
            }) // Chỉnh sửa thông tin của menu

            res.json({msg: "Cập nhật thành công"})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
// Lấy tất cả menu của cửa hàng
    get_Allmenu: async(req, res) => {
        try {
            const menu = await Menu.find({})
            res.json(menu)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Thêm món ăn vào giỏ hàng
    add_cart: async(req,res) => {
        try{
            const {TenMonAn, SoLuong, ThanhTien, user_id} = req.body

            const id = await GioHang.findOne({user_id})
            const Ten = await GioHang.findOne({TenMonAn})
            if(id && Ten)
            {
                await GioHang.findOneAndUpdate({TenMonAn}, {
                    SoLuong, ThanhTien
                })
            }
            else{
                const newCart = {
                    TenMonAn, SoLuong, ThanhTien, user_id
                }        
                await GioHang.create(newCart); //Lưu vào DB
                res.json({msg: "Thêm thành công"})
            }
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
// Lấy thông tin giỏ hàng
    get_Cart: async(req, res) => {
        try {
            const cart = await GioHang.find({user_id: req.params.id})
            res.json(cart)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Xóa món ăn khỏi giỏ hàng
    remove_Cart: async(req, res) => {
        try {
            await GioHang.deleteOne({_id: req.params.id})
            res.json({msg: "Thành công"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
module.exports = storeCtrl