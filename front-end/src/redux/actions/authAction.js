import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

// Gọi API lấy thông tin user từ controller
export const fetchUser = async(token) => {
   const res = await axios.get('http://localhost:5000/user/infor', {
   headers: {Authorization: token}
})
return res

}
//Hiển thị trên redux
export const dispatchGetUser= (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data.user,
            isAdmin: res.data.user.VaiTro === 0 ? true : false, // xác minh Admin theo vai trò
            isSeller: res.data.user.VaiTro === 2 ? true : false // xác minh Seller theo vai trò
        }
    }
}


