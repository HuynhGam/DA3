import ACTIONS from '../actions'

const menu = [];

// Xử lý Action get all user
const menuReducer = (state = menu , action) => {
    switch(action.type){
        case ACTIONS.GET_MENU:
            return action.payload
        default:
            return state
    }
}


export default menuReducer
