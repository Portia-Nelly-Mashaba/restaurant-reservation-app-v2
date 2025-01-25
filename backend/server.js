const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 5050

dotenv.config()

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Db connected')).catch((err)=>console.log(err));


app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req,res) => res.send('Hello World'))
app.listen(process.env.PORT || port, () => console.log(`Server is running on port ${process.env.PORT}`));
