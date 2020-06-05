const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.port || 3100;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

mongoose.connect(config.prod.mongodb.uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to database'))
    .catch((err) => console.error(err));
    


const users = require('./routes/user/');
const client = require('./routes/clients');
const invoice = require('./routes/invoice');
const product = require('./routes/product');

app.use('/users', users);
app.use('/clients', client);
app.use('/invoices', invoice);
app.use('/products', product);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));