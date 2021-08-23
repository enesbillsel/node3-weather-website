const request = require("request")

const forecast = (latitude, longtitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=81ad3eb0fe9a3a68b6e01eceff347acf&query=" + encodeURIComponent(longtitude) + "," + encodeURIComponent(latitude)
    //console.log(url)
    request({ url, json: true }, (error, {body}) => { // url:url & body: response.body
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.success != undefined) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + " throughout the day.  It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is "+body.current.humidity+"%")
        }
    })
}

module.exports = forecast
