const express = require('express')
const path = require('path')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public')) // public klasörünün pathini verir
//console.log(__filename)


const app = express() // doesnt take any args

const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath)) // public klasörünün içindeki static file'lar kullanıldı
                                            // find index.html then match the route url becaues file has a
                                            // special name. So app.get(''...) hiçbir zaman çalışmayacak
                                            // Bu yüzden silebilirsin
                                            // Bunun içerisinden index.html,about.html ve help.html geliyor


// localhost:3000/about.html
// localhost:3000/help.html
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

