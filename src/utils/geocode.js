const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibWVuZXMwNiIsImEiOiJja3NrNW5zemoya2U1MzJvMzdsNG1kOWFqIn0.pxaTmq0fwV0y80sxK_ZQnQ&limit=1"
    //address yerine encodeURIComponent(adress) diyebilirsin.Neden? Çünkü ? ! gibi özel karakterleri encode edeebilirsin
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to conect to location services!", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, {
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode