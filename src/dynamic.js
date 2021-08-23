const express = require('express')
const path = require('path')
// With handlebars, we'll be able to render dynamic content and will be able to easily use and reuse little pieces of markup throught the various pages in our app
//console.log(__dirname)
//console.log(path.join(__dirname,'../public')) // public klasörünün pathini verir
//console.log(__filename)


const app = express() // doesnt take any args

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates')

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

                            
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Enes Billsel"
    }) // render allows us to render one of our views we've configured express to use the view engine hbs
        // takes naem of hbs file from views second arg is dynamic data
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Computer Engineer",
        name:"Enes Billsel",
        content:"Merhaba Weather app'e hoşgeldiniz"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"Help me"
    })
})


app.get('/weather',(req,res)=>{
    res.send({
        forecast:'It\'s snowing',
        location:'Philadelphia'
    })
})

app.listen(3000, () =>{// Start up the server and it has specific port(use development port 3000)
                        // Takes 2 args first port, other callback func
    console.log("Server is up on port 3000.") // this message is never going to display to someone in the browser
}) 

