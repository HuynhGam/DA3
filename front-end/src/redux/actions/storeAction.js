import ACTIONS from './index'
import axios from 'axios'


// Gọi API từ controller qua bên react redux
export const fetchAllStores = async (token) => {
    const res = await axios.get('http://localhost:5000/user/all_store', {
        headers: {Authorization: token}
    })
    return res
}

// Hiển thị trên redux
export const dispatchGetAllStores = (res) => {
    return {
        type: ACTIONS.GET_ALL_STORES,
        payload: res.data
    }
}
