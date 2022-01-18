import ACTIONS from './index'
import axios from 'axios'


// Gọi API từ controller qua bên react redux
export const fetchMenu = async (id) => {
    const res = await axios.patch(`http://localhost:5000/store/get_menu/${id}`)
    return res
}

// Hiển thị trên redux
export const dispatchGetMenu = (res) => {
    return {
        type: ACTIONS.GET_MENU,
        payload: res.data
    }
}
