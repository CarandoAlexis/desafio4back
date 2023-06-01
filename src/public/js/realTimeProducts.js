const socket = io();
console.log('Conectado Con Socket');

document.getElementById('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const thumbnail = formData.get('thumbnail');
  const code = formData.get('code');
  const stock = formData.get('stock');
  const product = { title, description, price, thumbnail, code, stock };
  socket.emit('createProduct', product);
  console.log('createProduct recibido');
  event.target.reset();
});

socket.on('newProduct', (product) => {
  console.log('newProduct recibido:', product);
  const productItem = document.createElement('li');
  productItem.innerHTML = `
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <p>Precio: ${product.price}</p>
    <p>Código: ${product.code}</p>
    <p>Stock: ${product.stock}</p>
  `;
  console.log('Product item creado:', productItem);
  document.getElementById('productList').appendChild(productItem);
});
