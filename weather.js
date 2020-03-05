window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".degreeTemperature");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature")
    const tempSpan = document.querySelector(".temperature span");


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/15cb572d3f365c1faeac8f32ba936650/${lat},${long}`;
        
        fetch(api)
        .then(response =>{
            return response.json(); 
        })
        .then(data =>{
            console.log(data);
            
            const { temperature, summary, icon } = data.currently;

            //setting dom elements from api
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;


            //formula for celsius
            let celsius = (temperature - 32) * (5/9);


            //set Icon
            setIcons(icon, document.querySelector(".icon"));

            //change temperature units
            temperatureSection.addEventListener('click', ()=>{
                if(tempSpan.textContent == "F"){
                    tempSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                } else{
                    tempSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            });


        });
        });  
    }
    else{
        
    }
    
    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]) 
    }

});