function WeatherWidgit(element) {
  if (!element) {
    return;
  }
  let myData = {
    city: "-",
    temp: "-",
    temp_feels_Like: "-",
    country: "-",
    description: "-",
    icon: "-",
  };
  function getData(data) {
    myData = {
      city: data.name,
      temp: data.main.temp.toFixed(0),
      temp_feels_Like: data.main.feels_like.toFixed(0),
      country: data.sys.country,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
    myData.description =
      myData.description[0].toUpperCase() + myData.description.slice(1);
  }
  async function fetchUrl(url) {
    let content;
    let error = "";
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.cod != 200) {
        throw new Error(result.message);
      }
      getData(result);
    } catch (err) {
      error = `Something went wrong. Try again.  ${err.message}`;
    }

    const date = new Date();
    const today = date.toLocaleDateString();
    const time = date.toLocaleTimeString().slice(0, -3);
    content = `
      <div class="container">
      <div class="error">${error}</div>
         <div class="widget">
         
            <div class="widget-left">
               <div class="city">${myData.city}, <span class="country">${myData.country}</span></div>
               <div class="date">${today}</div>
               <div class="time">${time}</div>
            </div>
            <div class="widget-right">
               <div class="widget-right_header">
                  <div class="temp"> ${myData.temp} °C</div>
                  <div class="img">
                     <img src="http://openweathermap.org/img/wn/${myData.icon}@2x.png" alt="">
                  </div>
               </div>
               <div class="temp-feels_like">Feels like : ${myData.temp_feels_Like} °C</div>
               <div class="forecast">${myData.description}</div>
            </div>
         </div>
       </div>
    `;

    let container = document.createElement("div");
    container.innerHTML = content;
    element.append(container);
  }

  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetchUrl(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3a14ed878c17ea88667c02de9b9be534&units=metric`
    );
  });
}

const weatherWidgit = new WeatherWidgit(document.body);
