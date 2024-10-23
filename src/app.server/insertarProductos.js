const mysql = require('mysql');
const fs = require('fs');

// Lee el archivo de productos (suponiendo que es un JSON)
const products = JSON.parse(fs.readFileSync('path/to/your/products.json', 'utf-8'));

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabaseName'
});

// Conéctate a la base de datos
connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos!');
});

// Inserta los productos
const insertProducts = () => {
    const sql = 'INSERT INTO products (id, title, image, price, category_name, category_id) VALUES ?';
    const values = products.map(product => [product.id, product.title, product.image, product.price, product.category_name, product.category_id]);

    connection.query(sql, [values], (error, results) => {
        if (error) throw error;
        console.log(`${results.affectedRows} productos insertados`);
        connection.end(); // Cierra la conexión
    });
};

// Ejecuta la función
insertProducts();
