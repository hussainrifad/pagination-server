const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 8000;

// middleware 

app.use(cors());
app.use(express.json());

// mongodb Config

const uri = "mongodb+srv://mongobdUser02:mongobdUser02@cluster0.0jljrw3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try {

        const products = client.db('nodeMongoCrud').collection('products-ema-john')
        
        app.get('/products', async(req, res) => {
            
            const size = parseInt(req.query.size);
            const page = parseInt(req.query.page);
            const query = {};
            const cursor = products.find(query);
            const result = await cursor.skip(page*size).limit(size).toArray();
            const count = await products.estimatedDocumentCount();
            res.send({count,result});
            
        })


    } 
    finally {
        
    }
}
run().catch(error => console.error(error))

app.get('/', (req, res) => {
    res.send('Hi')
})

app.listen(port, () => {
    console.log('running');
})