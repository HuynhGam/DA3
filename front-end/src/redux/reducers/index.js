import { combineReducers } from 'redux'
import auth from './authReducers'
import token from './tokenReducers'
import users from './usersReducers'
import stores from './storeReducers'
import menu from './menuReducers'
import food from './foodReducers'
import cart from './cartReducers'

// Hiển thị biến trên redux
export default combineReducers({
    auth,
    token,
    users,
    stores,
    menu,
    food,
    cart
})