import ACTIONS from '../actions/'

// Khởi tạo biến trên redux
const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
    isSeller: false
}

// Xử lý ACTIOn LOGIN và GET_USER
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
                isSeller: action.payload.isSeller
            }
        default:
            return state
    }
}

export default authReducer