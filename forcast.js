const axios = require('axios');

const forcast = (lat,lng,callback)=>{
    axios.get('https://api.darksky.net/forecast/fb62f863ef4624321f218aad3edd3639/'+lat+','+lng)
    .then((response)=>{
        callback(undefined, response.data.currently);
    }).catch((error)=>{
        callback(error,undefined)
    })
}
module.exports = forcast;