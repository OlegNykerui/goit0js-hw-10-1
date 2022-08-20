const BASE = 'https://restcountries.com/v3.1/name';
const params = 'fields=name,capital,population,flags,languages';

export function fetchCountries(nameCountries) {
  return fetch(`${BASE}/${nameCountries}?${params}`)
    .then(response => {
      const { ok, status } = response;
      if (!ok) throw new Error(status);
      return response.json();
    })
    .catch(({ name, message }) => console.log(`${name}: ${message} `));
}
