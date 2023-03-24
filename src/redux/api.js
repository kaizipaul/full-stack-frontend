import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL_B; // Api baseURL

const fetchCarsData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/cars/`);
    return response.data;
  } catch (e) {
    throw e.toString();
  }
};

export const fetchSingleCar = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/cars/${id}`);
    return response.data;
  } catch (e) {
    throw e.toString();
  }
};

export default fetchCarsData;