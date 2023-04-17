// Fetch function ------------------------------------------>

const getCountries = async () => {
  const url = "https://restcountries.com/v3.1/all";

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCountriesData = await getCountries();

// Exporting fetch ------------>
export { getCountriesData };
