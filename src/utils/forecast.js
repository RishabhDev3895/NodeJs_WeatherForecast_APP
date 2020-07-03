const request= require('request')


var forecast=(lat,long,callback)=>{
    var url="http://api.weatherstack.com/current?access_key=d84b95f4bde27d91fdde78dae086fc47&query="+ lat +','+ long +"&units=m"

    request({url,json:true},(error,{body})=>{
        if(error){

            callback('Cannot connect to the forecast service provider',undefined)
        }

        else if(body.error){

            callback('Unable to process this the forecast request. Please try again with some other input', undefined)
        }
        else{
                callback(undefined,
                body.current.weather_descriptions[0]+'.'+' The Temperature is currently '+ body.current.temperature 
                +' degrees celcius. But it feels like '+ body.current.feelslike+ ' degrees celcius.' )
                  
            }
    })
}

module.exports=forecast