import axios from "axios";


export const HttpService = axios.create({

    baseURL: 'https://neispavani-001-site1.etempurl.com/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }


});