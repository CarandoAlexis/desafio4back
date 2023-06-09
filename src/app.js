import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import ProductManager from "./desafio4.js";

const productManager = new ProductManager("products.json");

const app = express();
const port = 8080;
app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


//----------------------------  SOCKET SPACE  ----------------------------
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  //crear un socket para que cuando un usuario se conecte le mande todos los productos de una
  const products = productManager.getProducts();
  socket.emit("currentProducts", products);


  // console.log(productManager.getProducts())

  //
  socket.on("createProduct", (product) => {
    try {
      // Crear un nuevo objeto de producto utilizando los datos recibidos del cliente
      console.log("Producto recibido en el servidor:", product);

      // Agregar el nuevo producto a la lista de productos
      productManager.addProduct(
        product.title,
        product.description,
        product.price,
        product.thumbnail,
        product.code,
        product.stock
      );
      // Emitir el evento 'newProduct' a todos los clientes con el nuevo producto
      io.emit("newProduct", product);

      console.log("Producto creado:", product);
    } catch (error) {
      console.error(error);
    }
  });
});
