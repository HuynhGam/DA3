// Đường dẫn API của web
const router = require('express').Router()
const auth = require('../middleware/auth')
const authSeller = require('../middleware/authSeller')
const storeCtrl = require('../controllers/storeController')

// Thêm cửa hàng
router.post('/create_shop', storeCtrl.create_store)
// Cập nhật cửa hàng
router.patch('/update_shop/:id', auth, authSeller, storeCtrl.update_store)
//Tạo menu
router.post('/create_food', storeCtrl.create_food)
//Lấy thông tin menu của một cửa hàng
router.patch('/get_menu/:id', storeCtrl.get_menu)
// Cập nhật cửa hàng
router.patch('/update_menu/:id', auth, authSeller, storeCtrl.update_menu)
// lấy tất cả thông tin menu
router.get('/all_menu', auth, storeCtrl.get_Allmenu)
// thêm vào giỏ hàng
router.post('/add_cart', auth, storeCtrl.add_cart)
// Giỏ hàng
router.patch('/cart/:id', storeCtrl.get_Cart)
// Xóa món ăn trong giỏ hàng
router.patch('/remove_food/:id', storeCtrl.remove_Cart)

module.exports = router  