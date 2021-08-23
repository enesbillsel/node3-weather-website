console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent=''
messageTwo.textContent=''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent refresh browser
    const location = search.value
    messageOne.textContent = "loding..."
    fetch('/weather?address=' + location).then((response) => { // fetch edildikten sonra then yapıyor
        response.json().then((data) => {//json geldiğinde then yapıyor
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent=''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.foreCast
            }


        })
    })
})