import ACTIONS from '../actions'

const stores = [];

// Xử lý Action get all user
const storesReducer = (state = stores , action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_STORES:
            return action.payload
        default:
            return state
    }
}


export default storesReducer
