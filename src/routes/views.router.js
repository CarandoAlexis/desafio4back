/*
import { Router } from "express";
import path from 'path';
import ProductManager from "../desafio4.js";
import { createServer } from 'http';
import { Server } from 'socket.io';

const router = Router();
const server = createServer(router);
const io = new Server(server);
const productManager = new ProductManager('products.json');



router.get('/',(req,res)=>{
    const products = productManager.getProducts();
    res.render('index',{ products })
});

router.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
  
    socket.on('newProduct', product => {
      try {
        productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock);
        io.emit('newProduct', product);
      } catch (error) {
        console.error(error);
      }
    });
  
    socket.on('deleteProduct', productId => {
      try {
        productManager.deleteProduct(productId);
        io.emit('deleteProduct', productId);
      } catch (error) {
        console.error(error);
      }
    });
  });

export default router;
*/
import { Router } from "express";
import ProductManager from "../desafio4.js";


const router = Router();
const productManager = new ProductManager('products.json');


router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('index', { products });
});

router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});



export default router;