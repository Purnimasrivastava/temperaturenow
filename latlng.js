const axios = require('axios');

const latlng = (address,callback)=>{
    axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGcybGV0IiwiYSI6ImNqdDZzMHk5bjBhazE0NGxocnl2ZWNmNmEifQ.kKR5mWUxWKFoIri1r09yTA')
    .then((response)=>{
        const result = response.data.features[0].center;
        result.place = response.data.features[0].text;
        callback(undefined, result);
    }).catch((error)=>{
        callback(error,undefined)
    })
}
module.exports = latlng;