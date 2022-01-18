import ACTIONS from '../actions'

const cart = [];

// Xử lý Action get all user
const cartReducer = (state = cart , action) => {
    switch(action.type){
        case ACTIONS.GET_CART:
            return action.payload
        default:
            return state
    }
}


export default cartReducer
