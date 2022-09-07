
import axios from "axios";
import { BaseUrl } from "../components/Urls";


const axiosInstance = axios.create({
    baseURL: BaseUrl,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export default axiosInstance;