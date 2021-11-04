let timecont = document.getElementsByClassName("time")[0];
let input = document.querySelectorAll("input")[0];
let button = document.querySelectorAll("button")[0];

button.addEventListener("click", () => {
    getWeather(input.value);
})

let mainDG = document.getElementsByClassName("lit_wig")[0].querySelectorAll("div");
let mainIMG = document.getElementsByClassName("picture")[0].querySelector("img");
let calen = document.getElementsByClassName("calender")[0].querySelectorAll("div");
let everyHours = document.getElementsByClassName("days")[0].querySelectorAll("div");

let himg = document.querySelector(".days").querySelectorAll("img")








setInterval(() => {
    let date = new Date();
    let arrdiv = timecont.querySelectorAll("div")
    arrdiv[0].innerText = date.getHours();
    arrdiv[1].classList.toggle("hide");
    if (date.getMinutes()<10){
        arrdiv[2].innerText ="0" + date.getMinutes();
    } else arrdiv[2].innerText = date.getMinutes();

}, 1000);


async function getWeather(city = "minsk") {

    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=612063be1ae68a9db6d031baba132bda`;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=66b3c3e1676ddd60a73d8a3160445061`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(res);
    console.log(data);
    rerrender(data);

    calender(data.list[0].dt);

    
    everyHours[1].innerText = `${hours(data.list[1].dt)}`
    everyHours[2].innerText = `${hours(data.list[2].dt)}`
    everyHours[3].innerText = `${hours(data.list[3].dt)}`
    everyHours[4].innerText = `${hours(data.list[4].dt)}`
    
    day_night(data.list[0],data.city.sunrise,data.city.sunset,mainIMG);
    day_night(data.list[0],data.city.sunrise,data.city.sunset,himg[0]);
    day_night(data.list[1],data.city.sunrise,data.city.sunset,himg[1]);
    day_night(data.list[2],data.city.sunrise,data.city.sunset,himg[2]);
    day_night(data.list[3],data.city.sunrise,data.city.sunset,himg[3]);
    day_night(data.list[4],data.city.sunrise,data.city.sunset,himg[4]);


    everyHours[10].innerText = Math.trunc(data.list[0].main.temp) + "º";
    everyHours[11].innerText = Math.trunc(data.list[1].main.temp) + "º";
    everyHours[12].innerText = Math.trunc(data.list[2].main.temp) + "º";
    everyHours[13].innerText = Math.trunc(data.list[3].main.temp) + "º";
    everyHours[14].innerText = Math.trunc(data.list[4].main.temp) + "º";
    
   

}
getWeather("minsk");






function rerrender(data) {
    mainDG[0].innerText = Math.trunc(data.list[0].main.temp) + "º";
    mainDG[1].innerText = data.list[0].weather[0].description.toUpperCase();
    mainDG[2].innerText = data.city.name;

}

function day_night(list, sunrise, sunset, img) {
    if (list.dt> sunrise && list.dt < sunset) {
        dayS(list.clouds.all,img)
    } else {
        night(list.clouds.all,img);
    }
}

function dayS(clouds,img) {
    if (clouds < 40) {
        img.src = "./pic/weatheryyyy/sun.png"
        return 'sun'
    }
    else if (clouds < 60) {
        img.src = "./pic/weatheryyyy/sun_clouds.png"
    }
    else if (clouds < 80) {
        img.src = "./pic/weatheryyyy/clouds.png"
    }
    else if (clouds <= 100) {
        img.src = "./pic/weatheryyyy/storm.png"
    }
}

function night(clouds,img) {
    if (clouds < 40) {
        img.src = "./pic/weatheryyyy/moon.png"
    }
    else if (clouds < 60) {
        img.src = "./pic/weatheryyyy/moon_clouds.png"
    }
    else if (clouds < 80) {
        img.src = "./pic/weatheryyyy/clouds.png"
    }
    else if (clouds <= 100) {
       img.src = "./pic/weatheryyyy/storm.png"
    }
}


function calender(ms) {
    let headDATA = new Date(+(ms + "000"));
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    let arr = headDATA.toLocaleString("eng", options).split(" ")
    calen[0].innerText = arr[0].slice(0, -1);
    calen[1].innerText = `${arr[2].slice(0, -1)} ${arr[1]} ${arr[3]}`
}


function twoDay(ms) {
    let headDATA = new Date(+(ms + "000"));
    return(headDATA.toLocaleTimeString("en-UK", {hour:"2-digit", minute:"2-digit"})) ;
}

function hours (ms) {
    let headDATA = new Date(+(ms + "000"));
    return(headDATA.toLocaleTimeString("en-UK", {hour:"2-digit", minute:"2-digit"})) ;
}