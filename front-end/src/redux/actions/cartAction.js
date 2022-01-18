import ACTIONS from './index'
import axios from 'axios'


// Gọi API từ controller qua bên react redux
export const fetchCart = async (id) => {
    const res = await axios.patch(`http://localhost:5000/store/cart/${id}`)
    return res
}

// Hiển thị trên redux
export const dispatchGetCart = (res) => {
    return {
        type: ACTIONS.GET_CART,
        payload: res.data
    }
}
