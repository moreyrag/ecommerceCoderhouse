import knex from 'knex'

export default class DbManager{
    constructor(options, tabla){
        try {
            this.db = options
            this.tabla = tabla
        } catch (error) {
            throw new Error("error al inicializar el contenedor:" + error.message)
        }
    }

    async getAll() {
        try {
            return await this.db.from(this.tabla).select('*')
        } catch (error) {
            throw new Error("ocurrio un error en getAll al leer la base de datos:" + error.message)
        }
    }

    async getById(id){
        try {
            const objetosContenidoJSON = await this.getAll()
            if (!objetosContenidoJSON) {
                return undefined
            } else {
                let obj = objetosContenidoJSON.find(o=>o.id===parseInt(id))
                return obj    
            }
        } catch (error) {
            throw new Error("error al obtener el objeto por id:" + error.message)
        }
    }

    // recibe un array de objetos
    async saveAll(objetos){
        try {
            if (objetos !== null && objetos.length > 0) {
                objetos.forEach(async (objeto) => {
                    await this.saveObject(objeto) // inserta o actualiza segun corresponda
                })   
            } else{
                if (objetos !== null && objetos.length===0) { // borrar todos los registros
                    await this.deleteAll()
                }
            }
        } catch (error) {
            throw new Error("ocurrio un error al almacenar los objetos:" + error.message)
        }
    }

    async saveObject(objeto){
        try {
            if (objeto!==null && objeto!==undefined){
                let obj = await this.getById(objeto.id) // ya existe el objeto? por como se hizo habria que buscar por nombre
                if (obj == undefined) {
                    // insertar
                    await this.insertRow(objeto)
                } else{
                    // actualizar
                    await this.updateRow(obj, objeto)
                }         
            }
        } catch (error) {
            throw new Error("error al guardar el objeto:" + error.message)
        }
    }

    async insertRow(objeto){
        await this.db(this.tabla).insert(objeto)
    }

    async updateRow(objetoOld, objetoNew){
        for (const prop in objetoNew) {
            if (objetoOld[prop] !== objetoNew[prop] 
                && objetoNew[prop] !== undefined
                && objetoNew[prop] !== "" 
                && objetoNew[prop] !== null
                ) {
                    this.db(this.tabla).where({id:objetoOld.id}).update({prop: objetoNew[prop]})
            }
        }
    }

    async deleteById(id){
        try {
            await this.db(this.tabla).where({id:id}).del() 
        } catch (error) {
            throw new Error("error al borrar objeto por id" + error.message)
        }
    }

    async deleteAll(){
        try {
           await this.db(this.tabla).del()     
        } catch (error) {
            throw new Error("error al vaciar el contenedor" + error.message)
        }
    }
}
