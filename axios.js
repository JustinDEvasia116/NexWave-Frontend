import axios from 'axios';
import { baseUrl, adminUrl } from './src/constants/Constants';

const instance = axios.create({
  baseURL: baseUrl,
});

const adminInstance = axios.create({
  baseURL: adminUrl,
});



export { instance, adminInstance };
