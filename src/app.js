const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// With handlebars, we'll be able to render dynamic content and will be able to easily use and reuse little pieces of markup throught the various pages in our app
//console.log(__dirname)
//console.log(path.join(__dirname,'../public')) // public klasörünün pathini verir
//console.log(__filename)


const app = express() // doesnt take any args

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // css ve js'leri almayı sağlıyor

// Setup handlebars engine and views location
app.set('views', viewsPath)
// npm i hbs => Dynamic template oluşturabilmek için çok önemli ve gerekli
app.set('view engine','hbs') // set allows you to set a value fora givene express setting
                            // view engine are so so important, second args is name of module we installed(npm i hbs)
                            // Bunu yapabilmesi için app.js ile views'ın aynı yerde olması lazım.
                            // Bizim programda aynı yerde olmadığı için path'i set ettik
                            // Ayrıca çalışması içinde public klasörü içindeki index html'i sildik
hbs.registerPartials(partialsPath) //takes the directory where the partials live

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Enes Billsel"
    }) // render allows us to render one of our views we've configured express to use the view engine hbs
        // takes naem of hbs file from views second arg is dynamic data
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Enes Billsel",
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful text.",
        title:"Help",
        name:"Enes Billsel"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }
    geocode(req.query.address, (error, {longtitude,latitude,location} = {}) => { 
        if (error) {
            return res.send({error})
        }
        forecast(longtitude, latitude, (error, foreCastData) => { // callback chaining
            if (error) {
                return res.send({error})
            }
            return res.send({
                foreCast: foreCastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query) //query string(url) istenilen bilgileri gösterir
    if(!req.query.search){
        return res.send({
            error:'You must provide a search key'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:"Help article not found!",
        name:"Enes Billsel",
        title:"404",
    })
})

app.get('*',(req,res)=>{ // Bunu sona yazdık çünkü url geldiğinde yukarıdan aşağıya get'leri gexiyor
                        // eşleştiği get bulamayınca widcard(*)'a giriyor
    res.render('404',{
        message:"Page not found",
        name:"Enes Billsel",
        title:"404",
    })
})

app.listen(3000, () =>{// Start up the server and it has specific port(use development port 3000)
                        // Takes 2 args first port, other callback func
    console.log("Server is up on port 3000.") // this message is never going to display to someone in the browser
}) 

