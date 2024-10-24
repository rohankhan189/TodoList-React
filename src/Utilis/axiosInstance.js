//  import axios from 'axios'
// import { BASE_URL } from './contants'

// const axiosInstance=axios.create({
//     baseURL:BASE_URL,
//     timeout:1000000,
//     headers:{
//         'content-type':'application/jason',

//     },
// })
// axiosInstance.interceptors.request.use(
//     (config)=>
//     {
//         console.log("baseUrl", BASE_URL);
//         const accessToken = localStorage.getItem('token');
//         if (accessToken) {
//             config.headers.Authorization= `Bearer ${accessToken}` ;
//         }
//         return config

//     },
//     (error)=>{
//         return Promise.reject(error);

//     }

// );


// export default axiosInstance;

import axios from 'axios';
import { BASE_URL } from './contants';  // Assuming you have a constants.js file

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000000,  // Adjust if needed
    headers: {
        'Content-Type': 'application/json',  // Corrected typo
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("baseURL", BASE_URL);
        const accessToken = localStorage.getItem('token');
     
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
