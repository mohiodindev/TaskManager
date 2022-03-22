require('dotenv').config();

const express = require('express');
const app = express();
const errorHandller = require('./middleware/error')
const notFound = require('./middleware/notfound')
const tasks = require('./routes/tasks');
const connetDB =require('./Db/connect')

app.use(express.json());
app.use(express.static('./public'))
app.use('/api/v1/tasks' , tasks);
app.use(notFound);
app.use(errorHandller)

const port = process.env.PORT ||3000;
const start = async ()=>{
    try{
        await connetDB(process.env.MONGO_URI)
        app.listen(port , ()=>{
            console.log(`Listnning on port --> ${port} and DataBase is connected`);
        });
    } catch(err) {
        console.log(err.message);
    }
}
start();
