import fs from 'fs'

// 1. Creando JSON
// const productos = {
//     title: 'Saandalias Marroquí',
//     description: 'Sandalias hechas a mano de la colección marroquí',
//     price: 450,
//     thumbnail: 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz2.jpg?alt=media&token=b223f369-5264-4358-af5f-53eab965c6e8',
//     code: 152,
//     stock: 9
// }

class ProductManager {
    constructor(){
        this.path = "./products.json"
        this.format ='utf-8'
        this.error = undefined
        this.products = []
    }

    static id = 0
    // IMPRIMIENDO DATOS EN UN ARCHIVO .JSON usando .writeFile

    addProducts = async (title, description, price, thumbnail, code, stock) => {
              
        ProductManager.id ++

        let productos = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock            
        };

        this.products.push(productos)
            // console.log(productos)
            await fs.promises.writeFile("./products.json", JSON.stringify(this.products, null, '\t'))
    }

    // FILTAR UN PRODUCTO POR MEDIO DE SU ID usando .readFile

    getProducts = async() => {
        // console.log(JSON.parse(await fs.promises.readFile(this.path, this.format)))
            return JSON.parse(await fs.promises.readFile(this.path, this.format))
        }

    getProductById = async (id) => {
            let readProducts = await this.getProducts()

            if (!readProducts.find((prod => prod.id === id))) return console.log('No se encontró un producto, por favor intente con otro id')
            else return console.log(readProducts.find((prod) => prod.id === id))
        }  

    // ELIMINAR UN PRODUCTO POR SU ID SOBREESCRIBIENDO

    deleteProduct = async(id) => {
        let readProducts = await this.getProducts()
        let productFilter = readProducts.filter(products => products.id != id)
        // console.log(productFilter)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, '\t'))
        console.log('Se eliminó el producto seleccionado')
        // await fs.unlinkSync(this.path, JSON.stringify(this.productFilter))
        }
    

    // // // ACTUALIZAR PRODUCTOS 
       
    updateProduct = async({id, ...product}) => {
        await this.deleteProduct(id);
        let newProduct = await this.getProducts() 
        let modifyProduct = [{id, ...product}, ...newProduct]
        await fs.promises.writeFile(this.path, JSON.stringify(modifyProduct, null, '\t'))
        // console.log(modifyProduct)
    }
}





const manager = new ProductManager()
// manager.addProducts('Sandalias Marroquí','Sandalias hechas a mano de la colección marroquí', 450, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz2.jpg?alt=media&token=b223f369-5264-4358-af5f-53eab965c6e8', 152, 9 )
// manager.addProducts('Bolsa Marroquí','Bolso hecho a mano de la colección marroquí',380, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ace6.jpg?alt=media&token=82adc65b-32f2-48c0-a6e9-7dc1db887432', 102, 7 )
// manager.addProducts('Lentes','Lentes de metal derretido, edición limitada', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ac4.jpg?alt=media&token=3db0aebd-2a5c-4bda-b769-d97150a3e061', 145, 6 )
// manager.addProducts('Tacones hate','Tacones de la colección love-hate personalizados', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz1.jpg?alt=media&token=0f175971-e468-44c8-a505-0664d19bf320', 145, 4 )
// manager.addProducts('Tacones love','Tacones de la colección love-hate personalizados', 750, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz6.png?alt=media&token=f06585f5-cda1-4df5-82f6-89c29521fc37', 132, 5 )

manager.getProducts()


// Filtro para buscar por Id
// console.log('El producto con el id seleccionado es', manager.getProductById(4))


// // Filtro para eliminar productos 
// manager.deleteProduct(3)

// // Actualizando un producto 
manager.updateProduct({
        id: 5,
		title: "Tacones love",
		description: "Tacones de la colección love-hate personalizados nuevo modelo",
		price: 950,
		thumbnail: "https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz6.png?alt=media&token=f06585f5-cda1-4df5-82f6-89c29521fc37",
		code: 122,
		stock: 9
})








































//     getProducts = async() => {
//         return JSON.parse(await fs.promises.readFile(this.path, this.format))
//     }
// }

// const managerProduct = new ProductManager('./products.json')
// await managerProduct.addProducts('Bolsa Marroquí','Bolso hecho a mano de la colección marroquí',380, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ace6.jpg?alt=media&token=82adc65b-32f2-48c0-a6e9-7dc1db887432', 102, 7 )
// await managerProduct.addProducts('Lentes','Lentes de metal derretido, edición limitada', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ac4.jpg?alt=media&token=3db0aebd-2a5c-4bda-b769-d97150a3e061', 145, 6 )
// await managerProduct.addProducts('Tacones hate','Tacones de la colección love-hate personalizados', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz1.jpg?alt=media&token=0f175971-e468-44c8-a505-0664d19bf320', 145, 4 )
// await managerProduct.addProducts('Tacones love','Tacones de la colección love-hate personalizados', 750, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz6.png?alt=media&token=f06585f5-cda1-4df5-82f6-89c29521fc37', 132, 5 )




// class ProductManager{
//     constructor(path){
//         this.path = path
//         this.format ='utf-8'
//         this.error = undefined
//     }

//     generateId = () => {
//         return (this.products.length === 0) ? 1 : this.products[this.products.length-1].id +1
//      }

//     validateProducts = (title, description, price, thumbnail, code, stock) => {
//         if (!title || !description || !price || !thumbnail || !code || !stock) {
//             this.error = `El producto ${title} no cuenta con toda la información de venta'`
    
//         } else {
//             const found = this.path.find(prod => prod.code === code)
//             if (found) this.error = `El producto ${title} tiene un código existente'`
//             else this.error = undefined
//         }
//         }

//     addProduct = async(title, description, price, thumbnail, code, stock) => {
//         const products = await this.getProducts()
       
       
//         this.validateProducts(title, description, price, thumbnail, code, stock)
//         if (this.error=== undefined)  
//         this.products.push({id: this.generateId(), title, description, price, thumbnail, code, stock})
//         else 
//         console.log(this.error)

//         return await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
//     }

//     // addProducts = (title, description, price, thumbnail, code, stock) => {
        
        
//     // }

//     getProducts = async() => {
//         return JSON.parse(await fs.promises.readFile(this.path, this.format))
//     }
// }
//     addProducts = async (title, description, price, thumbnail, code, stock) => {
//         const products = await this.getProducts()
//         this.#validateProducts(title, description, price, thumbnail, code, stock)
//         if (this.#error=== undefined)  
//         this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
//         else 
//         console.log(this.#error)
        
//     }

//     getProductById = async() => {
//         return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
//     }

//     updateProduct = async() => {
//         return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
//     }

//     deleteProduct = async() => {
//         return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
//     }
// }

// const manager = new ProductManager('./products.json')
// manager.addProduct('Bolsa Marroquí','Bolso hecho a mano de la colección marroquí',380, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ace6.jpg?alt=media&token=82adc65b-32f2-48c0-a6e9-7dc1db887432', 102, 7 )
// manager.addProduct('Lentes','Lentes de metal derretido, edición limitada', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ac4.jpg?alt=media&token=3db0aebd-2a5c-4bda-b769-d97150a3e061', 145, 6 )
// manager.addProduct('Tacones hate','Tacones de la colección love-hate personalizados', 550, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz1.jpg?alt=media&token=0f175971-e468-44c8-a505-0664d19bf320', 145, 4 )
// manager.addProduct('Tacones love','Tacones de la colección love-hate personalizados', 750, 'https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz6.png?alt=media&token=f06585f5-cda1-4df5-82f6-89c29521fc37', 132, 5 )



// //  addProduct
// //  getProducts
// //  getProductById
// //  updateProduct
// //  deleteProduct
// //  this.path