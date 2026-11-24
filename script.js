const form=document.getElementById("trailForm");
const errors=document.getElementById("errors");
const validate=()=>{
    let msg="";
    if(!name.value.trim()) msg="Name is required";
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
        msg="Valid email required";
    else if(message.value.length>500)
        msg="Message must be under 500 characters";
    errors.textcontent=msg;
    [name,email,message].forEach(i=>i.setattributes("aria-invalid","false"));
     if(msg){
        if(!name.value.trim()) name.setattribute("aria-invalid","true");
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
            email.setattribute("aria-invalid","true");
        if(message.value.length>500)
            message.setattribute("aria-invalid","true");
     }
     return !msg;
};
let timer;
form.addEventListener("input",()=>{clearTimeout(timer);timer=settimeout(validate,300);});
form.addEventListener("submit",e=>{e.preventDefault();if(validate()){const data=Object.fromEntries(new FormData(form).entries());console.log(JSON.stringify(data,null,2));}});

const weather = document.getElementById("weather");

fetch("https://api.open-meteo.com/v1/forecast?latitude=51.05&longitude=-114.07&current=temperature_2m")
.then(response => {
    console.log("response received");
    return response.json();
})
.then(data => {
    console.log(data);

    weather.textContent =
    `Current Temperature: ${data.current.temperature_2m}°C`;
})
.catch(error => {
    console.log("ERROR:", error);
    weather.textContent =
    "Unable to load weather data.";
});