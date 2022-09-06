let body = document.body;

function WeatherWidgit(element) {

  async function fetchUrl(url) {
    let response = await fetch(url);
    let result = await response.json();
    let data = {
      name: result.name,
      temp: result.main.temp,
      temp_feels_Like: result.main.feels_like,
    };
    console.log(result);
    console.log(data);

    let a = `
    <div class="container">
       <div class="box">
          ${data.name}- city
          ${data.temp} - tepm
          ${data.temp} - tepm
       </div>
       </div>
    `;
    let container = document.createElement("div");
    container.innerHTML = a;
    element.append(container);
  }
  fetchUrl(
    "https://api.openweathermap.org/data/2.5/weather?lat=48.457892&lon=35.056939&appid=3a14ed878c17ea88667c02de9b9be534"
  );
}

const weatherWidgit = new WeatherWidgit(body);
