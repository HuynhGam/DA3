import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"; 
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'
import Login from './component/login'
import Register from './component/register'
import HomePage from './component/homepage'
import Ad_Homepage from './component/admin/homepage'
import Store from './component/seller/store'
import Add_Store from './component/seller/addStore'
import Update_Store from './component/seller/updateStore'
import Update_Menu from './component/seller/updateMenu'
import Update_Info from './component/admin/updateInfo'
import Profile from './component/seller/profile'
import Profile_User from './component/body/profile'
import Password from './component/seller/password'
import Password_User from './component/body/password'
import Password_Ad from './component/admin/password'
import Menu from './component/seller/menu'
import Add_Menu from './component/seller/addMenu'
import Cart from './component/body/cart'
import Order from './component/body/detailFood'


function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('access_token')
    if(firstLogin){
      const getToken = async () => {

        // const res = await axios.post('http://localhost:5000/user/refresh_token', null)
        // dispatch({type: 'GET_TOKEN', payload: res.data.access_token})

         dispatch({type: 'GET_TOKEN', payload: firstLogin})
      }
      getToken()
    }
  },[auth.isLogged])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })

      }  
      getUser()
    }
  },[token, dispatch]) 


  return (
      <Router>
        <div className="App">
            <Route path ="/" exact component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          {/*Cart*/ }
            <Route path="/cart/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Cart/> : <Redirect to = "/login"/> 
            }} /> 
          {/*Homepage Admin */ }
            <Route path="/admin"  render={() => {
              return localStorage.getItem('access_token') ? <Ad_Homepage/> : <Redirect to = "/"/> 
            }} /> 
          {/*Page Store Manager */ }
            <Route path="/store"  render={() => {
              return localStorage.getItem('access_token') ? <Store/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Add Store */ }
            <Route path="/add-store"  render={() => {
              return localStorage.getItem('access_token') ? <Add_Store/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Update Store */ }
            <Route path="/update-store/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Update_Store/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Profile*/ }
             <Route path="/profile/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Profile/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Change Password */ }
             <Route path="/change-password/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Password/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Change Password Admin */ }
             <Route path="/change_password/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Password_Ad/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Update Info (Admin) */ }
            <Route path="/update-info/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Update_Info/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Menu (Seller) */ }
            <Route path="/menu/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Menu/> : <Redirect to = "/"/>
            }} /> 
          {/*Page Add Menu (Seller) */ }
            <Route path="/add-menu/:id"  render={() => {
                return localStorage.getItem('access_token') ? <Add_Menu/> : <Redirect to = "/"/>
              }} /> 
          {/*Page Update Menu (Seller) */ }
            <Route path="/update-menu/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Update_Menu/> : <Redirect to = "/"/>
            }} /> 
            {/*Page Detail Food (User) */ }
             <Route path="/oder/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Order/> : <Redirect to = "/"/>
            }} /> 
             {/*Page Update Profile (User) */ }
             <Route path="/profile_user/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Profile_User/> : <Redirect to = "/"/>
            }} /> 
            {/*Page Change Password (User) */ }
            <Route path="/password_user/:id"  render={() => {
              return localStorage.getItem('access_token') ? <Password_User/> : <Redirect to = "/"/>
            }} /> 
        </div> 
      </Router>
    );  
}

export default App;
