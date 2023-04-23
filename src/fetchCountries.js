const BASE_URL = `https://restcountries.com/v3.1/name/`;
const fields = `fields=name,capital,population,flags,languages`;

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`).then(responce => {
    if (responce.ok) {
      return responce.json();
    }
  });
}

export { fetchCountries };