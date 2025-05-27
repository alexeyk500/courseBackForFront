// const BASE_URL = 'https://restcountries.com/v2/';
const BASE_URL = 'http://localhost:3000/countries/';

// export const ALL_COUNTRIES =
//   BASE_URL + 'all?fields=name,capital,flags,population,region';

export const ALL_COUNTRIES =  BASE_URL

export const searchByCountry = (name) => BASE_URL + 'name/' + name;

export const filterByCode = (codes) =>
  BASE_URL + 'alpha?codes=' + codes.join(',');
