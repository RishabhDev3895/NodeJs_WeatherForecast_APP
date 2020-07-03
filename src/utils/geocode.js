var request= require('request')


var geocode=(address,callback)=>{
    var url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoicmlzaGFiaGRldiIsImEiOiJja2Jwa2h1eGgxanN3MndyNWM1aDJ4dzBiIn0.IcqqJf3YBPx7kk7mdfvb4w'
    
   request({url,json:true },(error,{body}={})=>{
    if(error){
        callback('Could not connect to the geocode provider',undefined)
    }
    else if(body.features.length===0){
        callback('Unable to process the geocodes for given input. Please try again with some other input',undefined)
    }
    else{
        callback(undefined,{
            longitude :body.features[0].center[0],
            latitude :body.features[0].center[1],
            location : body.features[0].place_name
        })
        
    }
   })

}

module.exports=geocode



