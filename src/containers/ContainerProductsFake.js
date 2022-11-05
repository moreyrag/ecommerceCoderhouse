import { faker } from '@faker-js/faker'

export default class ContainerProductsFake {
    constructor(cantidad){
        try {
            this.products = []
            for (let index = 0; index < cantidad; index++) {
                this.products.push(
                    {
                        "name": faker.commerce.productName(),
                        "price": faker.commerce.price(),
                        "image": faker.internet.avatar()
                    }
                )
            }
        } catch (error) {
            throw new Error("error initializing the container:" + error.message)
        }
    }

    async getAll() {
        try {
            return this.products
        } catch (error) {
            throw new Error("error in getAll reading the database:" + error.message)
        }
    }

    async getById(id){
        try {
            const product = this.products.find((product)=>product.id==id)
            if (product == null) {
                throw new Error("product not found")
            } else {
                return product
            } 
        } catch (error) {
            throw new Error("error in getById of product:" + error.message)
        }
    }
}
