import axios from 'axios'

export const fetchCities = async () => {

    try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        const cities = response.data.data.map((country: any) => ({
            country: country.country,
            cities: country.cities.map((city: string) => `${city}, ${country.country}`)
        })).flatMap((country: { cities: any; }) => country.cities);
        localStorage.setItem('cities', JSON.stringify(cities));
    } catch (error) {
        console.error("Error fetching cities: ", error);
    }
};
