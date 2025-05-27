
const mapCountry = (country: any) => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    region: country.region,
    population: country.population,
    flags: {
      svg: country.flags.svg,
      png: country.flags.png
    },
  }
}

const compareCountryName = (firstCountry: any, secondCountry: any): number => {
  if (firstCountry.name < secondCountry.name) {
    return -1
  }
  if (firstCountry.name > secondCountry.name) {
    return 1
  }
  return 0
}

export const transformAllCountries = (countries: any[]) => {
  return countries.map(mapCountry).sort(compareCountryName)
}