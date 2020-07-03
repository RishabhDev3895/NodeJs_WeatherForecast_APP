const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const port= process.env.PORT||3000
const app= express()
// the of the directory to serve provide it to express.static as static asset of our site
const publicDirectoryPath= path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

//Telling the hbs to register the partials at the provided path
const partialsPath= path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//set a value for view engine config option
app.set('view engine','hbs')

viewsPath=path.join(__dirname,'../templates/views')
app.set ('views',viewsPath)


/*we can set a new value for views option. For customizing the views directory to templates/views
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views',viewsPath)*/

app.get('/',(req,res)=>{
    res.render('index',{    
        title :'Weather Forecast',

        name : 'Rishabh Dubey'
    })
})

app.get('/about',(req,res)=>{
res.render('about',{
    title :'ABOUT ME',
    name :'Rishabh Dubey'
})
})  

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELP',
        Content: 'Contact Us for Any Information',
        name: 'Rishabh Dubey'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address) {
        return res.send({
            Error: "No address provided"}
            )
    }
       console.log(req.query)
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error});
        }

        forecast(latitude,longitude,(error,weatherData)=>{
            if(error)  {
                return res.send(error);
            }
            res.send({forecast: weatherData, location: location ,address: req.query.address});
        })
    })
    //  res.send({ forecast: 'Partly cloudy.The temperature is 30 degrees centigrade.'
    // ,location: req.query.address})       
})

//Error Page that matches every url
app.get('*',(req,res)=>{
    res.render('404Error',{
        title:'404',
        name:'Rishabh Dubey',
        errorMessage: 'Page Not Found'
    }) 
})  
//routing    
// app.get('',(req,res)=>{
//     res.send('Hello Express!')            
// })

app.listen(port,()=>{
    console.log("Server is running on port "+ port)
})