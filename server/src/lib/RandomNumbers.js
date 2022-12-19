const maxNum = 1000
const numerosAleatorios = []

const resultadoSorteo = {}

process.on("message", msg=>{
    let cantidad = isNaN(msg)? null : parseInt(msg)
    if (cantidad) {
        generaAleatorios(cantidad)
        calculaResultadoSorteo()
        process.send(resultadoSorteo)
    } else {
        process.send("error")
    }

})

const generaAleatorios = (cantidadNumerosAleatorios)=>{
    for (let index = 0; index < cantidadNumerosAleatorios; index++) {
        numerosAleatorios.push(parseInt(Math.random()*maxNum+1))
    }
} 
const calculaResultadoSorteo = () =>{
    numerosAleatorios.forEach((elemento)=>{
        resultadoSorteo[elemento] = (resultadoSorteo[elemento] || 0) + 1
    })
}
