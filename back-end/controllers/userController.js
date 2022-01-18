const TaiKhoan = require("../models/userModel") 
const CuaHang = require("../models/storeModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// const {CLIENT_URL} = process.env
  
const userCtrl = {
// Xử lý đăng ký
    register: async(req, res) => {
        try{
            const {HoTen, SDT, DiaChi, Email, MatKhau, checked} = req.body

            if(!HoTen || !Email || !MatKhau || !SDT)
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            }
            if(!validateEmail(Email))
            {
                return res.status(400).json({msg: "Email bạn nhập không hợp lệ"})
            }
            if(!validateNumberPhone(SDT))
            {
                return res.status(400).json({msg: "Số điện thoại bạn nhập không hợp lệ"})
            }
            const user = await TaiKhoan.findOne({Email})
            if(user)
            {
                return res.status(400).json({msg:"Email này đã được đăng ký"})
            }        
            if(MatKhau.length <6)
            {
                return res.status(400).json({msg:"Mật khẩu phải ít nhất 6 ký tự"})
            }

        // Hàm băm password
            const passwordHash = await bcrypt.hash(MatKhau, 12)

        // Xét vai trò của người dùng
            const VaiTro = 2

            if(checked == false) // Nếu checkbox không chọn
            {
                if(!DiaChi){
                    return res.status(400).json({msg:"Nếu bạn không phải là người bán hàng. Vui lòng nhập địa chỉ"})
                }
                // Lưu thông tin từ body vào biến newUsser
                const newUser = {
                    HoTen, Email, MatKhau: passwordHash, SDT, DiaChi
                }  
                await TaiKhoan.create(newUser); //Lưu vào DB
            }
            else{
                const newUser = {
                    HoTen, Email, MatKhau: passwordHash, VaiTro, SDT
                }  
                await TaiKhoan.create(newUser); //Lưu vào DB
            }       
             
            // const activation_token = createActivationToken(newUser) //Tạo token để xác nhận qua mail
            //  await TaiKhoan.create(newUser); //Lưu vào DB


        // Gửi mail xác nhận
            // const url = `${CLIENT_URL}/user/activate/${activation_token}`
            // sendMail(email, url)
           

            res.json({msg: "Đăng ký thành công. Hãy đăng nhập tài khoản của bạn nào"})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },  
// Xử lý đăng nhập
    login: async (req, res) => {
        try{
            const {Email, MatKhau} = req.body 
            const user = await TaiKhoan.findOne({Email})
            if(!user){
                return res.status(400).json({msg:"Email này không tồn tại"})
            }  
            // Giải mã hàm băm mật khẩu
            const isMatch = await bcrypt.compare(MatKhau, user.MatKhau)
            if(!isMatch)
            {
                return res.status(400).json({msg:"Mật khẩu không chính xác"})
            }

            const access_token = createAccessToken({id: user.id}) // Tạo token đăng nhập theo id của user
            // res.cookie('access_token', access_token, {
            //     httpOnly: true,
            //     path:'/user/refresh_token',
            //     maxAge: 7*24*60*60*1000 // 7 days
            // })

            res.status(200).json({
                status: "Đăng nhập thành công",
                data: {
                    access_token , VaiTro: user.VaiTro
                }
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }

    },
// Lấy token đăng nhập từ cookies
    getAccessToken: (req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken
            if(!rf_token){
                return res.status(400).json({msg: "Không tìm thấy token. Vui lòng đăng nhập"})
            }
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) {
                    return res.status(400).json({msg: err})
                }
            const access_token = createAccessToken({id: user.id})
            res.json({access_token})
            })
        }
        catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
// Quên mật khẩu (chưa hoàn thiện)
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "Email này không tồn tại."})

            const access_token = createAccessToken({id: user._id})
            // Gửi mail reset mật khẩu....



            res.json({msg: "Đã reset mật khẩu của bạn."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Reset mật khẩu
    resetPassword: async (req, res) => {
    try {   
        const passwordHash = await bcrypt.hash('111111', 12)

        await TaiKhoan.findOneAndUpdate({_id: req.params.id}, {MatKhau: passwordHash})
        res.json({msg: "Mật khẩu đã được cập nhật lại: 111111"})      
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    }, 
//Đổi mật khẩu
    changePassword: async (req, res) => {
        try {
            const {MatKhauCu, MatKhauMoi} = req.body
        // Kiểm tra điều kiện từ bên client 
            if(!MatKhauCu || !MatKhauMoi)
            {
                return res.status(400).json({msg: "Bạn hãy nhập đủ thông tin dưới đây"})
            }
            if(MatKhauCu === MatKhauMoi){
                return res.status(400).json({msg: "Bạn không thể đổi mật khẩu bạn đang sử dụng"})
            }
            if(MatKhauMoi.length <6){
                return res.status(400).json({msg:"Mật khẩu phải ít nhất 6 ký tự"})
            }
        //Khởi tạo user để lấy mật khẩu của user
            const user = await TaiKhoan.findOne({_id: req.params.id})
            if(user){
                const check_pass = await bcrypt.compare(MatKhauCu, user.MatKhau) // Giải mã băm mật khẩu cũ
                if(check_pass)
                 {
                    const newHash = await bcrypt.hash(MatKhauMoi, 12) // Băm mật khẩu mới
                    await TaiKhoan.findOneAndUpdate({_id: req.params.id}, {MatKhau: newHash}) //Update
                    res.json({msg: "Đã thay đổi mật khẩu!"})
                 }
                 else{
                    return res.status(400).json({msg: "Mật khẩu cũ của bạn không chính xác"})
                 }
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 
// Lấy thông tin đăng nhập người dùng
    getUserInfor: async (req, res) => {
        try {
            const user = await TaiKhoan.findById(req.user.id).select('-MatKhau')
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
//Lấy tất cả thông tin người dùng
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await TaiKhoan.find().select('-MatKhau')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
//Lấy tất cả thông tin người dùng
    getStoresAllInfor: async (req, res) => {
        try {
            const stores = await CuaHang.find()

            res.json(stores)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Cập nhật thông tin người dùng
    updateUserInfor: async (req, res) => {
        try {
            const {HoTen, SDT} = req.body
            if(!HoTen || !SDT)
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            } 
            
            await TaiKhoan.findOneAndUpdate({_id: req.params.id}, {HoTen, SDT})
            res.json({msg: "Cập nhật thành công"})      
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
 // Cập nhật thông tin người dùng cho admin
    updateInfor: async (req, res) => {
        try {
            const {Email, VaiTro} = req.body
            if(!Email || !VaiTro)
            {
                return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})
            } 
            
            await TaiKhoan.findOneAndUpdate({_id: req.params.id}, {Email, VaiTro})
            res.json({msg: "Cập nhật thành công"})      
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
// Đăng xuất
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Đã đăng xuất."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

// Kiểm tra tính hợp lệ của email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Kiểm tra tính hợp lệ của số điện thoại chỉ là số và có 10 ký tự
function validateNumberPhone(sdt) {
    const re = /^\d{10}$/;
    return re.test(sdt);
}

// Khởi tạo token dựa trên user và giới hạn tối đa thời gian là 5'
// const createActivationToken = (payload) => {
//     return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
// }

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
} // Khởi tạo token với thời gian tối đa là 7 ngày


// const createRefreshToken = (payload) => {
//     return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
// } // Khởi tạo token refresh và giới hạn tối đa thời gian là 7 ngày
module.exports = userCtrl