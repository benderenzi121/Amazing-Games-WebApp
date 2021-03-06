import axios from 'axios';
import {setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PERMISSIONS_SUCCESS,
    PERMISSIONS_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';


//Load User

export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try{
    const res = await axios.get('http://localhost:5000/api/auth');
     dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  };
}




//Register User
export const register = ({name, email, password}) =>  async dispatch => {
  const config={
    headers: {
        'content-type' : 'application/json'
    }
  }

  const body = JSON.stringify({name, email,password });


  try{
    const res = await axios.post('http://localhost:5000/api/users', body, config);
    console.log(res.data);
    
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    });
    dispatch(loadUser());

  } catch(err){
      console.log(err);
    const errors = err.response.data.errors;
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
        type:REGISTER_FAIL
    });
  }
}

//Login User 
export const login = (email, password) =>  async dispatch => {
  const config={
    headers: {
        'content-type' : 'application/json'
    }
  }

  const body = JSON.stringify({email,password });


  try{
    const res = await axios.post('http://localhost:5000/api/auth', body, config);
   
    dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    });
    
    

  } catch(err){
      
    const errors = err.response.data.errors;
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
        type:LOGIN_FAIL
    });
  }
}
//Logout user 

export const logout = () =>dispatch => {
  dispatch({type: LOGOUT});
}



//get permissions

export const loadPermissions = () => async dispatch => {
  const config={
    headers: {
        'content-type' : 'application/json'
    }}

    try{
      const res = await axios.get('http://localhost:5000/api/auth/admin', config);
      
      dispatch({
        type:PERMISSIONS_SUCCESS,
        payload:res.data.permission
    });
    }catch(err){
        const errors = err.response.data.errors;
        dispatch({
          type:PERMISSIONS_FAIL,
          errors: errors
      });
    }
}