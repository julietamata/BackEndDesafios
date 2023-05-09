class ProductManager {
    #products
    #error
    constructor() {
        this.#products = []
        this.#error = undefined
    }

    getProducts = () => {
     return this.#products
    }

    getProductById = (id) => {
        const product = this.#products.find(prod => prod.id === id)
        if (!product) return 'Not found'
        else return product
    }

    #generateId = () => {
       return (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id +1
    }

    #validateProducts = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        this.#error = `El producto ${title} no cuenta con toda la información de venta'`

    } else {
        const found = this.#products.find(prod => prod.code === code)
        if (found) this.#error = `El producto ${title} tiene un código existente'`
        else this.#error = undefined
    }
    }
       
    addProducts = (title, description, price, thumbnail, code, stock) => {
        this.#validateProducts(title, description, price, thumbnail, code, stock)
        if (this.#error=== undefined)  
        this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
        else 
        console.log(this.#error)
        
    }
}

const productManager = new ProductManager()
productManager.addProducts('Saandalias Marroquí','Sandalias hechas a mano de la colección marroquí', 450, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz2.jpg?alt=media&token=b223f369-5264-4358-af5f-53eab965c6e8', 152, 9 )
productManager.addProducts('Bolsa Marroquí','Bolso hecho a mano de la colección marroquí', 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ace6.jpg?alt=media&token=82adc65b-32f2-48c0-a6e9-7dc1db887432', 7 )
productManager.addProducts('Lentes','Lentes de metal derretido, edición limitada', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ac4.jpg?alt=media&token=3db0aebd-2a5c-4bda-b769-d97150a3e061', 145, 6 )
productManager.addProducts('Tacones hate','Tacones de la colección love-hate personalizados', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz1.jpg?alt=media&token=0f175971-e468-44c8-a505-0664d19bf320', 145, 4 )
productManager.addProducts('Tacones love','Tacones de la colección love-hate personalizados', 750, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz6.png?alt=media&token=f06585f5-cda1-4df5-82f6-89c29521fc37', 132, 5 )


console.log(productManager.getProducts())

// Filtro por Id
console.log('El producto con el id seleccionado es', productManager.getProductById(3))