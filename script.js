const fetchAPI = async (city) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3c17440ef7msha869a2cc3554329p1530ccjsn9a28d4f343b6",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    let result = await response.text();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const getTable = async () => {
  let html = "";
  const array = ["Delhi", "Lucknow", "Kolkata", "Hyderabad"];

  // Use Promise.all to wait for all asynchronous fetchAPI calls
  const results = await Promise.all(array.map(async (city) => {
    let result = await fetchAPI(city);
    return { city, result: JSON.parse(result) };
  }));

  results.forEach(({ city, result }) => {
    html +=
      `<tr>
        <th scope="row" class="text-start">${city}</th>
        <td>${result.cloud_pct}</td>
        <td>${result.temp}</td>
        <td>${result.feels_like}</td>
        <td>${result.humidity}</td>
        <td>${result.min_temp}</td>
        <td>${result.max_temp}</td>
        <td>${result.wind_speed}</td>
        <td>${result.wind_degrees}</td>
        <td>${result.sunrise}</td>
        <td>${result.sunset}</td>
      </tr>`;
  });
  document.getElementById("table-body").innerHTML = html;
};

const getWeather = async (city) => {
  let result = await fetchAPI(city);
  result = JSON.parse(result);
  document.getElementById("main-city").innerHTML = city;
  //document.getElementById("cloud_pct").innerHTML = result.cloud_pct;
  document.getElementById("temp").innerHTML = result.temp;
  document.getElementById("temp2").innerHTML = result.temp;
  document.getElementById("feels_like").innerHTML = result.feels_like;
  document.getElementById("humidity").innerHTML = result.humidity;
  document.getElementById("humidity2").innerHTML = result.humidity;
  document.getElementById("min_temp").innerHTML = result.min_temp;
  document.getElementById("max_temp").innerHTML = result.max_temp;
  document.getElementById("wind_speed").innerHTML = result.wind_speed;
  document.getElementById("wind_speed2").innerHTML = result.wind_speed;
  document.getElementById("wind_degrees").innerHTML = result.wind_degrees;
  document.getElementById("sunrise").innerHTML = result.sunrise;
  document.getElementById("sunset").innerHTML = result.sunset;
};

document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  await getWeather(document.getElementById("city").value);
});

getWeather("Delhi");
getTable();
