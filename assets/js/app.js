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
})
