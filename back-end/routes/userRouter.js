// Đường dẫn API của web
const router = require('express').Router()
const userCtrl = require('../controllers/userController')
const storeCtrl = require('../controllers/storeController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authSeller = require('../middleware/authSeller')
  
// Đăng ký
router.post('/register', userCtrl.register)
// Đăng nhập
router.post('/login', userCtrl.login)
// làm mới Token
router.post('/refresh_token', userCtrl.getAccessToken)
// Quên mật khẩu
router.post('/forgot', userCtrl.forgotPassword)
// Thay đổi mật khẩu
router.post('/reset', auth, userCtrl.resetPassword)
// Lấy thông tin
router.get('/infor', auth, userCtrl.getUserInfor)
// Lấy thông tin tất cả người dùng
router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)
// Cập nhật mật khẩu
router.patch('/reset_password/:id', userCtrl.resetPassword)
// Cập nhật thông tin người dùng
router.patch('/update_info/:id', auth, userCtrl.updateUserInfor)
// Cập nhật thông tin người dùng cho admin
router.patch('/update/:id', auth, authAdmin, userCtrl.updateInfor)
// Thay đổi mật khẩu
router.patch('/change_password/:id', auth, userCtrl.changePassword)
// Lấy tất cả thông tin cửa hàng
router.get('/all_store', auth, userCtrl.getStoresAllInfor)
// Đăng xuất
router.get('/logout', userCtrl.logout)

module.exports = router  