import React from 'react';
import axios from 'axios'
import { message } from 'antd';

const BASE_URL = process.env.REACT_APP_BASE_URL

const AuthContext = React.createContext({
  register: async (name, email, password) => { },
  login: async (email, password) => { },
  logout: async () => { },
})

const useAuthContext = () => {
  const login = async (email, password) => {
    try {
      const {data} = await axios.post(`${BASE_URL}/login`, {email, password})
      message.success('Login Successfully');
      // message.success(data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('token', data.token);
    } catch (error) {
      if(error.response?.status === 401) {
        window.location.pathname !== '/login' && window.location.replace('/login');
      }
      let errmsg = 'Unknown Error';
      if (!error?.response) {
        errmsg = 'Cannot get response from server';
      } else if (error?.response?.data) {
        const data = error.response.data;
        errmsg = data.message || data.errors[0]?.message || data.errors[0] || data.errors || 'Unknown Error'; 
      }
      message.error(errmsg);
      throw errmsg
    }
  }
  const register = async (name, email, password) => {
    try {
      await axios.post(`${BASE_URL}/register`, {name, email, password, level: 'user'})
      message.success('Register Successfully')
    } catch (error) {
      let errmsg = 'Unknown Error';
      if (!error?.response) {
        errmsg = 'Cannot get response from server';
      } else if (error?.response?.data) {
        const data = error.response.data;
        errmsg = data.message || data.errors[0]?.message || data.errors[0] || data.errors || 'Unknown Error'; 
      }
      message.error(errmsg);
      throw errmsg
    }
  }
  const logout = async () => {
    localStorage.clear();
    window.location.replace('/login');
  }
  const localToken = localStorage.getItem('token');
  React.useEffect(() => {
    !localToken && window.location.pathname !== '/login' && window.location.replace('/login');
    localToken && localStorage.setItem('token', localToken);
  }, [localToken])
  return { login, logout, register };
}

const AuthProvider = (props) => {
  const { Provider } = AuthContext;
  const hookValue = useAuthContext();
  return (
    <Provider value={hookValue}>{props.children}</Provider>
  )
}

export { AuthContext, AuthProvider }
