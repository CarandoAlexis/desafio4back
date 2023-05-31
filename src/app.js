import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'  
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const port = 8080;
app.use(express.static(`${__dirname}/public`))
app.engine('handlebars', handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/',viewsRouter)

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = new Server(server);

io.on('connection', socket =>{
    console.log('Nuevo cliente conectado')
} )