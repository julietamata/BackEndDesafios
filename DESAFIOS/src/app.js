import express from 'express'
import ProductManager from './ProductManager.js';


const app = express()

const productos = new ProductManager ()
const getProducts = productos.getProducts(); // Función del ProductManager


console.log(await getProducts);

// RUTA PARA DEVOLVER VALORES CON UN LÍMITE

app.get("/products", async (request, response) =>{
    let limit = parseInt(request.query.limit);
    if (!limit) return response.send(await getProducts)
    let allProducts = await getProducts
    let productLimit = allProducts.slice(0, limit)
    response.send(productLimit)
    // console.log(await getProducts)
});
 

// RUTA PARA DEOLVER VALORES CON UN ID

app.get("/products/:id", async (request, response) =>{
    let id = parseInt(request.params.id);
    let allProducts = await getProducts;
    let getProductById = allProducts.find(item => item.id === id)
    response.send(getProductById)
});



app.listen(8080, () => console.log('Server up '))


