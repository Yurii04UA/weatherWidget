function WeatherWidgit(element) {
  if (!element) {
    return;
  }
  async function fetchUrl(url) {
    let data = {};
    let content;
    let error = "";
    try {
      const response = await fetch(url);
      const result = await response.json();
      data = {
        city: result.name,
        temp: result.main.temp.toFixed(0),
        temp_feels_Like: result.main.feels_like.toFixed(0),
        country: result.sys.country,
        description: result.weather[0].description,
        icon: result.weather[0].icon,
      };
    } catch (e) {
      error = 'Something went wrong. Try again'
      data = {
        city: "-",
        temp: "-",
        temp_feels_Like: "-",
        country: "-",
        description: "-",
        icon: "-",
      };
    }
    const description =
      data.description[0].toUpperCase() + data.description.slice(1);
    const date = new Date();
    const today = date.toLocaleDateString();
    const time = date.toLocaleTimeString().slice(0, -3);
    content = `
      <div class="container">
      <div class="error">${error}</div>
         <div class="widget">
         
            <div class="widget-left">
               <div class="city">${data.city}, <span class="country">${data.country}</span></div>
               <div class="date">${today}</div>
               <div class="time">${time}</div>
            </div>
            <div class="widget-right">
               <div class="widget-right_header">
                  <div class="temp"> ${data.temp} °C</div>
                  <div class="img">
                     <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="">
                  </div>
               </div>
               <div class="temp-feels_like">Feels like : ${data.temp_feels_Like} °C</div>
               <div class="forecast">${description}</div>
            </div>
         </div>
       </div>
    `;

    let container = document.createElement("div");
    container.innerHTML =content;
    element.append(container);
  }

  navigator.geolocation.getCurrentPosition(function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetchUrl(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3a14ed878c17ea88667c02de9b9be534&units=metric`
    )
  });
}

const weatherWidgit = new WeatherWidgit(document.body);
