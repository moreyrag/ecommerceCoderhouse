const maxNum = 1000
const numerosAleatorios = []

const resultadoSorteo = {}

process.on("message", msg=>{
    let cantidad = parseInt(msg)
    generaAleatorios(cantidad)
    calculaResultadoSorteo()
    process.send(resultadoSorteo)
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
