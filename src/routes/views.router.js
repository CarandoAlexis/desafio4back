import { Router } from "express";
import path from 'path';
import ProductManager from "../desafio4.js";
import { createServer } from 'http';
import { Server } from 'socket.io';

const router = Router();
const productManager = new ProductManager('products.json');


router.get('/',(req,res)=>{
    const products = productManager.getProducts();
    res.render('index',{ products })
});


export default router;