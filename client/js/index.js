const formSubmit = document.getElementById("idFormLogin")

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
    /*
    ,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
    }
    */
  })

formSubmit.addEventListener("submit", (e)=>{
    e.preventDefault()
    const username = document.getElementById("username").value
    instance.post('login', {
        username: username,
      })
      .then(function (response) {
        if (response.status==200 && response.data.result=="ok") {
          // console.log(response)
          localStorage.setItem("username", username)
          window.location.href="pages/home.html"
        } else {
          console.log("error login")
        }

      })
      .catch(function (error) {
        console.log(error)
      })
})


