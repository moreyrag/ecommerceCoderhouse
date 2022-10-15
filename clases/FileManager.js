import fs from "fs"

export default class FileManager{
    constructor(rutaArchivo){
        try {
            this.pathFileContenedor = rutaArchivo
            fs.access(rutaArchivo, fs.F_OK, (err) => {
                if (err) {
                    this.saveAll([])
                }
            })
        } catch (error) {
            throw new Error("error al inicializar el contenedor:" + error.message)
        }
    }

    async leerArchivo() {
        try {
            const contenido = await fs.promises.readFile(this.pathFileContenedor, 'utf-8')
            return contenido
        } catch (error) {
            throw new Error("ocurrio un error al leer el archivo:" + error.message)
        }
    } 

    async escribirArchivo(pTexto) {
        try {
            await fs.promises.writeFile(this.pathFileContenedor, pTexto, 'utf-8')
        } catch (error) {
            throw new Error("ocurrio un error al escribir el archivo:" + error.message)
        }
    }

    async getFileSize() {
        try {
            const sizeFile = await fs.promises.stat(this.pathFileContenedor).then((estadisticas)=>estadisticas.size)
            return sizeFile
        } catch (error) {
            throw new Error("ocurrio un error al calcular el size del archivo:" + error.message)
        }
    }

    // recibe un array de objetos
    async saveAll(objetos){
        await this.escribirArchivo(JSON.stringify(objetos, null, 1)) 
    }
    
    async getAll(){
        try {
            let datos = await this.leerArchivo()
            const objetosContenidoJSON = JSON.parse(datos)
            return objetosContenidoJSON    
        } catch (error) {
            throw new Error("error al obtener todos los objetos:" + error.message)
        }
    }

    async saveObject(obj){
        try {
            if (obj!==null && obj!==undefined){

                // recuperar objetos del archivo
                const objetosContenidoJSON = await this.getAll()
                let idProximo


                switch (objetosContenidoJSON.length) {
                    case 0:
                        idProximo = 1
                        break;
                    case 1:
                        idProximo = objetosContenidoJSON[0].id+1
                        break;
                    default:
                        idProximo = objetosContenidoJSON.sort((a,b)=>b.id-a.id)[0].id+1
                        break;
                }

                obj.id = idProximo
                objetosContenidoJSON.push(obj)
                await this.saveAll(objetosContenidoJSON)

                return idProximo                
            }
        } catch (error) {
            throw new Error("error al guardar el objeto:" + error.message)
        }
    }

    async getById(id){
        try {
            const objetosContenidoJSON = await this.getAll()
            // let obj = objetosContenidoJSON.filter(o=>o.id===id)
            let obj = objetosContenidoJSON.find(o=>o.id===parseInt(id))
            return obj
        } catch (error) {
            throw new Error("error al obtener el objeto por id:" + error.message)
        }
    }

    async deleteById(id){
        try {
            const objetosContenidoJSON = await this.getAll()
            const nuevosObjetos = objetosContenidoJSON.filter(o=>o.id!==id)
            await this.saveAll(nuevosObjetos)
        } catch (error) {
            throw new Error("error al borrar objeto por id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.saveAll([])        
        } catch (error) {
            throw new Error("error al vaciar el contenedor" + error.message)
        }
    }
}
