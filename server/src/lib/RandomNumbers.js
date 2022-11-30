const maxNum = 1000
const numerosAleatorios = []

const resultadoSorteo = {}
// const resultadoSorteoLento = []
const cantidadNumerosAleatorios = 20

process.on("message", msg=>{
    let cantidad = parseInt(msg)
    let numerosAleatorios = generaAleatorios(cantidad)
    calculaResultadoSorteo()
    process.send(resultadoSorteo)
})

const generaAleatorios = (cantidadNumerosAleatorios)=>{
    for (let index = 0; index < cantidadNumerosAleatorios; index++) {
        numerosAleatorios.push(parseInt(Math.random()*maxNum+1))
    }
    // console.log(numerosAleatorios)
    // calculaResultadoSorteo()
    // calculaResultadoSorteoLenta()
} 

const calculaResultadoSorteoLenta = () =>{
    let index
    let contador = 0
    for (let num = 1; num <= cantidadNumerosAleatorios; ) {
        index = numerosAleatorios.indexOf(num)
        if (index!=-1) {
            contador++
            numerosAleatorios.splice(index,1)
        } else {
            resultadoSorteoLento.push({[num]:contador})
            contador = 0
            num++
        }
    }
    console.log(JSON.stringify(resultadoSorteoLento, null, 1))
}

// versión óptima
const calculaResultadoSorteo = () =>{
    numerosAleatorios.forEach((elemento)=>{
        resultadoSorteo[elemento] = (resultadoSorteo[elemento] || 0) + 1
    })
    // console.log(resultadoSorteo)
}


