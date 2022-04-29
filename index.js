//requires
const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb')
//middleware
app.use(cors())
app.use(express.json())
//port
const port = 5000
//mongo
const uri = "mongodb+srv://database-user-1:databaseofzubayer@cluster0.1f3iy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)
const run = async () => {
    try {
        await client.connect()
        const database = client.db('text-db')
        const collection = database.collection('texts')
        //text-add
        app.post('/text', async (req, res) => {
            const text = req.body
            const result = await collection.insertOne(text)
            res.send(result)
            console.log(result.insertedId)
        })
        //text-retrieve
        app.get('/text', async (req, res) => {
            const query = {}
            const cursor = collection.find(query)
            const texts = await cursor.toArray()
            res.send(texts)
        })
    } finally {

    }

}
run().catch(console.dir)
app.listen(port)


