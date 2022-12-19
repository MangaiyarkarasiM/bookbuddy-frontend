import axios from "axios";

const fetchApi = axios.create({
    baseURL: 'https://book-buddy.vercel.app'
  //baseURL: 'http://localhost:5000',
})

export default fetchApi;