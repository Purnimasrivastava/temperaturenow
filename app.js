const express = require('express');
const hbs  = require('hbs');
const path = require('path');
const forcast = require('./forcast');
const latlng = require('./latlng');

const app = express();

//path variable
const views = path.join(__dirname,'template/page');
const partial = path.join(__dirname,'template/include');
const static = path.join(__dirname,'assets');
//view engine
app.set('view engine','hbs');
app.set('views',views);
hbs.registerPartials(partial);
//seting static directory for css,js files
app.use(express.static(static));
//routing
app.get('/',(req,res)=>{
    res.render('index',{
        title:'index'
    });
})
app.get('/weather',(req,res)=>{
    const address = req.query.address || 'Delhi';
    latlng(address,(err,data)=>{
        if(err != null){
            console.log('error',err);
            res.send({
                error:'true'
            });
        }
        forcast(data[1],data[0],(err,response)=>{
            if(err != null){
                console.log('error',err);
                res.send({
                    error:'true'
                });
            }
            const result = response;
            result.place = data.place;
            res.send(result);
        });
    });
    
   
})
app.get('/forcast',(req,res)=>{
    forcast(req.query.lat,req.query.lng,(err,response)=>{
        if(err != null){
            console.log('error',err);
            res.send({
                error:'true'
            });
        }
        const result = response;
        res.send(result);
    });
    
   
})



const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('Server is running on '+port);
});