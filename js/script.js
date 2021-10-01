
// Fonction appelée lors du click du bouton
function start(city = "") {
  // Création de l'objet apiWeather

  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
      const cityname = data.name;

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

    apiWeather.fetchThreeDaysForecast()
    .then(function(response)
    {
      let data = response.data;
      //juste pour recuperer les 3 premiers jours

      for (let i = 1; i <= 3; i++) {
        data.list[i - 1]['Index'] = i - 1;
        const main = data.list[i - 1].weather[0].main;
        const description = data.list[i - 1].weather[0].description;
        const temp = data.list[i - 1].temp.day;
        const icon = apiWeather.getHTMLElementFromIcon(data.list[i - 1].weather[0].icon);

        document.getElementById(`today-forecast-main-${i}`).innerHTML = main;
        document.getElementById(`today-forecast-more-info-${i}`).innerHTML = description;
        document.getElementById(`icon-weather-container-${i}`).innerHTML = icon;
        document.getElementById(`today-forecast-temp-${i}`).innerHTML = `${temp}°C`;
    }
    console.log(data);

    let array = data.list;

      
    });

    return apiWeather;
}

function update() {

  const city = document.getElementById('city-input').value;

  return start(city);
    
}
