import ACTIONS from './index'
import axios from 'axios'


// Gọi API từ controller qua bên react redux
export const fetchFood = async (token) => {
    const res = await axios.get(`http://localhost:5000/store/all_menu`, {
        headers: {Authorization: token}
    })
    return res
}

// Hiển thị trên redux
export const dispatchGetFood = (res) => {
    return {
        type: ACTIONS.GET_ALL_MENU,
        payload: res.data
    }
}
