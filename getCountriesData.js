const getCountriesData = (nextStepFunc) => {
  const url = "https://restcountries.com/v3.1/all";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((countriesResult) => {
      nextStepFunc(countriesResult);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getCountriesData };
