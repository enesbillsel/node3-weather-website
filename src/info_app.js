const express = require('express')
const path = require('path')

console.log(__dirname)
console.log(path.join(__dirname,'../public')) // public klasörünün pathini verir
//console.log(__filename)


const app = express() // doesnt take any args

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath)) // public klasörünün içindeki static file'lar kullanıldı
                                            // find index.html then match the route url becaues file has a
                                            // special name. So app.get(''...) hiçbir zaman çalışmayacak
                                            // Bu yüzden silebilirsin
// SİLİNEBİLİR
app.get('', (req, res) => { // when someone tries to get the resource at a specific url, takes 2 args
                            // first is route(partial url), second funct
                            // When someone visits the home page, this func would describe what to send back to them
                            // Func first args(req) is object that is containing info about the incomin request to sever
                            // Func second args(res) what is containing a bunch of methods allowing us to customize
                            // what we're going to send back to the requester
    res.send('<h1>Weather</h1>') // this allows us to send something back to the requester
})

app.get('/help',(req,res)=>{ 
    res.send([{ // express detect this object,then convert to Json and send requester
        name:'Andrew',
        age:27
    },
    {
        name:"Enes",
        age:25
    }])
})

app.get('/about',(req,res)=>{
    res.send("<h1>About</h1>")
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

