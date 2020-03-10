const weather = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#floating-temp');
const message2 = document.querySelector('#floating-city');
const message3 = document.querySelector('#floating-con');



weather.addEventListener('submit',(e)=>{
    message3.textContent = 'loading...';
    message2.textContent = '';
    message.textContent = '';
    e.preventDefault();
    const address = search.value;
    setfloats(address);
})

$(document).ready(()=>{
    var options = {
        enableHighAccuracy: true,

        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var message = document.querySelector('#floating-temp');
        var message2 = document.querySelector('#floating-city');
        var message3 = document.querySelector('#floating-con');
        /*console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);*/
        fetch('/forcast?lat='+crd.latitude+'&lng='+crd.longitude).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    
                }else{
                    var temperature = (5/9) * (data.temperature - 32);
                    message2.textContent = 'your location';
                    message.textContent = temperature.toFixed(1)+"'C ";
                    message3.textContent = 'Now in ';
                }
                
            })
        });                  
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setfloats('delhi');
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
    
})
function setfloats(address='delhi'){
    var message = document.querySelector('#floating-temp');
    var message2 = document.querySelector('#floating-city');
    var message3 = document.querySelector('#floating-con');
    message3.textContent = 'loading...';
    message2.textContent = '';
    message.textContent = '';
    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                
            }else{
                var temperature = (5/9) * (data.temperature - 32);
                message2.textContent = data.place;
                message.textContent = temperature.toFixed(1)+"'C ";
                message3.textContent = 'Now in ';
            }
            
        })
    });
}