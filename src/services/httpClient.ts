import axios from 'axios';
import { showNotFoundError } from '../store/errorSlice';
import { store } from './../index';


const httpClient = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL, withCredentials: true});

httpClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if(error.response.status === 404)
          store.dispatch(showNotFoundError(true));
        
        throw new Error(error.response.data.errorMessage);
      } else {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
  
        throw new Error('Our server temporarily died on DEFCON');
      }
    }
  );


export default httpClient;
