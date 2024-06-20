import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


const pubdir = path.join(__dirname,'./views/public');
app.use(express.static(pubdir));


db.connect((error)=>{
    if(error){
        console.log("Error connecting to the database: ",error.stack);
        return;
    }
    console.log('Connected to database...');
});


app.get('/', (req,res) => {
    res.render('/views/public/index');
});

app.listen(port, ()=>{
    console.log(`Server started on Port ${port}`);
});