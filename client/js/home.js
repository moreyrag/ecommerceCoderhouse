const instance = axios.create({
    baseURL: 'http://localhost:8080/'
})

const html = document.getElementById("usernameHome")
const btnLogout = document.getElementById("idBtnLogout")

// const res = await fetch("/username")
instance.get('username')
    .then(function (response) {
        if (response.status==200 && response.data.result=="ok") {
            // console.log(response)
            const username = localStorage.getItem("username") // response.data.username
            // console.log(username)
            html.innerHTML += username
        } else {
            console.log("error in get user name")
        }
    })
    .catch(function (error) {
        console.log(error)
    })

btnLogout.addEventListener("click", (e)=>{
    e.preventDefault()
    instance.get('logout')
    .then(function (response) {
        console.log("hola")

        if (response.status==200 && response.data.result=="ok") {
            console.log(response)
            window.location.href="./logout.html"
        } else {
            console.log("error en logout " + response.data)
        }
        })
        .catch(function (error) {
            console.log(error)
        })
})

// const inventoryjson = await fetch("/inventory")
    instance.get('inventory')
    .then(function (response) {
      if (response.status==200 && response.data.result=="ok") {
          // console.log(response.data.data.products)
          const prods = response.data.data.products
          const htmlProds = document.getElementById("idProductos")
          const strHtml = ""
          prods.forEach(product => {
              htmlProds.innerHTML+="<strong>"+product.name+"</strong></br>"
          })
          
      } else {
        console.log("error in get inventory")
      }

    })
    .catch(function (error) {
      console.log(error)
    })


    
