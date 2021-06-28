const lonval=document.getElementById("lon");
const latval=document.getElementById("lat");
const aqv=document.getElementById("sp1");
const aqs=document.getElementById("sp2");
const butval=document.getElementById("but");
const comp=document.querySelectorAll(".val")
const key="9283def9f773657c54b23fd2c7684a9b"; //5b856b33645d4741bad905ecbf851806
const baseUrl="https://api.openweathermap.org/data/2.5/air_pollution";
const getUserLocation=()=>{
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(getPosition,getPositionError);
	}
	else{
		getPositionError({message:"Can't access your Location.\n Enable your GPS"});
	}
}
const getPosition=pos=>{
	const lon=pos.coords.longitude.toFixed(4),
	lat=pos.coords.latitude.toFixed(4)

	lonval.value=lon;
	latval.value=lat;

	getAirQuality(lat,lon);
}
const getPositionError=e=>{
	alert(`${e.message}`);
}
const getAirQuality=async(lat, lon)=>{
const data=await fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${key}`).catch(err=>{
getPositionError({message:"Something went wrong. Check you internet connection."})
console.log(err);
})
const realData=await data.json();
console.log(realData);
airQualInd(realData);
container_comp(realData);
}
const airQualInd=realData=>{
const aqi=realData.list[0].main.aqi;
const gv1=realData.coord.lon;
const gv2=realData.coord.lat;
console.log(gv1);
console.log(gv2);
let color="",aqi_status="",col=""
aqv.innerHTML=aqi;
switch(aqi){
case 1:
aqi_status="&#11044 Good"
col="rgb(19,201,28)"
var marker = new mapboxgl.Marker({
draggable: false,
color:"green"


})
.setLngLat([gv1, gv2])
.addTo(map);
break
case 2:
aqi_status="&#11044 Moderate"
col="yellow"
var marker = new mapboxgl.Marker({
draggable: false,
color:"yellow"


})
.setLngLat([gv1, gv2])
.addTo(map);
break
case 3:
aqi_status="&#11044 Unhealthy [Catg-1]"
col="rgb(201,202,13)"
var marker = new mapboxgl.Marker({
draggable: false,
color:"orange"


})
.setLngLat([gv1, gv2])
.addTo(map);
break
case 4:
aqi_status="&#11044 Unhealthy [Catg-2]"
col="rgb(204,83,13)"
var marker = new mapboxgl.Marker({
draggable: false,
color:"red"


})
.setLngLat([gv1, gv2])
.addTo(map);
break
case 5:
aqi_status="&#11044  Very Unhealthy"
col="rgb(204,13,.13)"
var marker = new mapboxgl.Marker({
draggable: false,
color:"rgb(128,0,0)"


})
.setLngLat([gv1, gv2])
.addTo(map);
break
default:
aqi_status="---Unknown---"
}
aqs.innerHTML=aqi_status;
aqs.style.color=col;

}
const container_comp=realData=>{
let components={...realData.list[0].components}
comp.forEach(ele=>{
const attr=ele.getAttribute("data-comp")
ele.innerHTML=components[attr]+=" µg/m³"
ele.style.color="red"
})

}
butval.addEventListener("click",()=>{
getAirQuality(parseFloat(latval.value).toFixed(4),parseFloat(lonval.value).toFixed(4))
})

getUserLocation();


