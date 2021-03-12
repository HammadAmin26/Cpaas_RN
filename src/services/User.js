import axios from 'axios';
import {API_URL} from '../config/Constants';

const User = {
  Signup: (data) => {
    return axios.post(`${API_URL}/signup`,data,{
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    });
  },
  Login: (data) => {
    return axios.post(`${API_URL}/Login`,data,{
        headers:{
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    });
  },
  getGroups: (token) => {
    
    return axios.get(`${API_URL}/AllGroups`,{
        headers:{
          'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    }); 
    // 
  },
  getAllUsers: (token) => {
    return axios.get(`${API_URL}/AllUsers`,{
        headers:{
          'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    });
  },
  createChat: (data,token) => {
    return axios.post(`${API_URL}/CreateGroup`,data,{
        headers:{
          'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    });
  },

};

export default User;
// AllGroups