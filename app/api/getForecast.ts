// getForecast.ts
import axios from 'axios';

const API_KEY = '';  

export const getForecast = async (cityName: string, startDate: string, endDate: string) => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/history.json`, {
            params: {
                key: API_KEY,
                q: cityName,
                dt: startDate,
                end_dt: endDate
            }
        });
        return response.data;
    } catch (error) {
        console.error('Weather API error:', error);
        return null;
    }
};
